import {ChannelController} from "./controller/ChannelController"
import {MessageController} from "./controller/MessageController";
import {body, query} from "express-validator";

export const Routes = [
    // all channels
    {route: "/channels", method: "get", controller: ChannelController, action: "all"},
    // create channel
    {route: "/channels", method: "post", controller: ChannelController, action: "save"},
    // raise an error
    {route: "/channels/error", method: "get", controller: ChannelController, action: "error"},
    // create message
    {
        route: "/messages", method: "post", controller: MessageController, action: "save", validations: [
            body('channel_id').isNumeric(),
            body('title').isString().isLength({max: 255}),
            body('content').isString().isLength({max: 1024}),
        ]
    },
    // list messages
    {
        route: "/messages", method: "get", controller: MessageController, action: "list", validations: [
            query('channel_id').isNumeric().optional(),
            query('page').isInt({min: 1}).optional(),
            query('page_size').isInt({min: 3}).optional(),
        ]
    },
]