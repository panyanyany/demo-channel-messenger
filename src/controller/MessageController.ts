import {NextFunction, Request, Response} from "express"
import {AppDataSource} from "../data-source";
import {Message} from "../entity/Message";
import {FindManyOptions} from "typeorm";

export class MessageController {

    private messageRepository = AppDataSource.getRepository(Message)

    async list(request: Request, response: Response, next: NextFunction) {
        const options: FindManyOptions<Message> = {}
        const page = parseInt((request.query.page || '1').toString())
        const pageSize = parseInt((request.query.page_size || '10').toString())
        const channelId = parseInt((request.query.channel_id || '0').toString())
        options.where = {}
        options.order = {createdAt: "DESC"}
        if (channelId > 0) {
            options.relations = {}
            options.relations.channel = true

            options.where.channel = {}
            options.where.channel.id = channelId
        }
        options.skip = (page - 1) * pageSize
        options.take = pageSize

        const pagination = {
            data: [],
            total: 0,
            page_size: pageSize,
            page: page,
            total_page: 0,
        }
        pagination.total = await this.messageRepository.count(options)
        pagination.data = await this.messageRepository.find(options)
        pagination.total_page = Math.ceil(pagination.total / pagination.page_size)
        return pagination
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const model = new Message()
        model.channel = request.body.channel_id
        model.title = request.body.title
        model.content = request.body.content
        return await this.messageRepository.save(model)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.messageRepository.findOneBy({id: parseInt(request.params.id)})
        return await this.messageRepository.remove(userToRemove)
    }

}