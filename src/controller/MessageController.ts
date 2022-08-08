import {NextFunction, Request, Response} from "express"
import {AppDataSource} from "../data-source";
import {Message} from "../entity/Message";

export class MessageController {

    private messageRepository = AppDataSource.getRepository(Message)

    async list(request: Request, response: Response, next: NextFunction) {
        return this.messageRepository.find()
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