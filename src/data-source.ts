import "reflect-metadata"
import {DataSource} from "typeorm"
import {Channel} from "./entity/Channel";
import {Message} from "./entity/Message";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "ubuntu",
    password: "ubuntu",
    database: "demo_channel_messenger",
    synchronize: true,
    logging: false,
    entities: [Channel, Message],
    migrations: [],
    subscribers: [],
})
