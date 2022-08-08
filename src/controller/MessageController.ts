import {NextFunction, Request, Response} from "express"
import {AppDataSource} from "../data-source";
import {Message} from "../entity/Message";
import {FindManyOptions} from "typeorm";

export class MessageController {

    private messageRepository = AppDataSource.getRepository(Message)

    // Get message list
    async list(request: Request, response: Response, next: NextFunction) {
        const options: FindManyOptions<Message> = {}
        const page = parseInt((request.query.page || '1').toString())
        const pageSize = parseInt((request.query.page_size || '10').toString())
        const channelId = parseInt((request.query.channel_id || '0').toString())
        options.where = {}
        options.order = {createdAt: "DESC"}
        options.relations = {}
        options.relations.channel = true

        if (channelId > 0) {
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
            code: 0,
            message: 'success',
        }
        pagination.total = await this.messageRepository.count(options)
        pagination.data = await this.messageRepository.find(options)
        pagination.total_page = Math.ceil(pagination.total / pagination.page_size)
        return pagination
    }

    // Create a message to channel
    async save(request: Request, response: Response, next: NextFunction) {
        const model = new Message()
        model.channel = request.body.channel_id
        model.title = request.body.title
        model.content = request.body.content
        const result = await this.messageRepository.save(model)
        return {code: 0, message: 'success', ...result}
    }
}