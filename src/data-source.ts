import "reflect-metadata"
import {DataSource} from "typeorm"
// import settings from "./settings";

let ds: DataSource

// we're in jest
if (process.env.NODE_ENV === 'test') {
    ds = new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [__dirname + '/entity/*.ts'],
        synchronize: true,
        logging: false
    });
} else {
    // in production
    ds = new DataSource({
        type: "sqlite",
        database: "storage/database.sqlite",
        entities: [__dirname + '/entity/*.ts'],
        synchronize: true,
        logging: false
    });
    // ds = new DataSource({
    //     type: "mysql",
    //     host: "localhost",
    //     port: 3306,
    //     username: settings.db.username,
    //     password: settings.db.password,
    //     database: settings.db.database,
    //     synchronize: true,
    //     logging: false,
    //     entities: [__dirname + '/entity/*.ts'],
    //     migrations: [],
    //     subscribers: [],
    // })
}

export const AppDataSource = ds
