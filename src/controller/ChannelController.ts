import {NextFunction, Request, Response} from "express"
import {AppDataSource} from "../data-source";
import {Channel} from "../entity/Channel";
import {logger} from "../util/logging";

export class ChannelController {

    private channelRepository = AppDataSource.getRepository(Channel)

    // Get all channels
    async all(request: Request, response: Response, next: NextFunction) {
        return {data: await this.channelRepository.find(), code: 0, message: 'success'}
    }

    // Create a channel
    async save(request: Request, response: Response, next: NextFunction) {
        const model = new Channel()
        model.name = request.body.name
        const result = await this.channelRepository.save(model)
        return {code: 0, message: 'success', ...result}
    }

    // raise an error
    async error(request: Request, response: Response, next: NextFunction) {
        throw new Error('something bad')
    }
}