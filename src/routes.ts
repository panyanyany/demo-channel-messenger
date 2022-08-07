import {ChannelController} from "./controller/ChannelController"

export const Routes = [
    // all channels
    {route: "/channels", method: "get", controller: ChannelController, action: "all"},
    // create channel
    {route: "/channels", method: "post", controller: ChannelController, action: "save"},
    // delete channel
    {route: "/channels/:id", method: "delete", controller: ChannelController, action: "remove"},
]