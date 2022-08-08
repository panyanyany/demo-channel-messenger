import {NextFunction, Request, Response} from "express"
import {AppDataSource} from "../data-source";
import {Channel} from "../entity/Channel";

export class ChannelController {

    private channelRepository = AppDataSource.getRepository(Channel)

    // Get all channels
    async all(request: Request, response: Response, next: NextFunction) {
        return this.channelRepository.find()
    }

    // Create a channel
    async save(request: Request, response: Response, next: NextFunction) {
        const model = new Channel()
        model.name = request.body.name
        return await this.channelRepository.save(model)
    }
}