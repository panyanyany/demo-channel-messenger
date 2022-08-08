import {ChannelController} from "./controller/ChannelController"
import {MessageController} from "./controller/MessageController";
import {body} from "express-validator";

export const Routes = [
    // all channels
    {route: "/channels", method: "get", controller: ChannelController, action: "all"},
    // create channel
    {route: "/channels", method: "post", controller: ChannelController, action: "save"},
    // delete channel
    {route: "/channels/:id", method: "delete", controller: ChannelController, action: "remove"},
    // create message
    {
        route: "/messages", method: "post", controller: MessageController, action: "save", validations: [
            body('channel_id').isNumeric(),
            body('title').isString().isLength({max: 255}),
            body('content').isString().isLength({max: 1024}),
        ]
    },
]