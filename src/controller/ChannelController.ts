import {NextFunction, Request, Response} from "express"
import {AppDataSource} from "../data-source";
import {Channel} from "../entity/Channel";

export class ChannelController {

    private channelRepository = AppDataSource.getRepository(Channel)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.channelRepository.find()
    }

    async save(request: Request, response: Response, next: NextFunction) {
        console.log('----body', request.body)
        const model = new Channel()
        model.name = request.body.name
        return await this.channelRepository.save(model)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.channelRepository.findOneBy({id: parseInt(request.params.id)})
        await this.channelRepository.remove(userToRemove)
    }

}