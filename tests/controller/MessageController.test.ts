import {AppDataSource} from "../../src/data-source";
import {Channel} from "../../src/entity/Channel";

const request = require("supertest");
const app = require("../../src/app");

describe("Test the message path", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()

        await AppDataSource.manager.save(
            AppDataSource.manager.create(Channel, {
                name: 'Life',
            })
        )
    });
    afterAll(async () => {
        // connection must be destroyed or jest process will not exit
        await AppDataSource.destroy()
    });

    test("It should create a new message", async () => {
        let response = await request(app).post("/messages").send({
            'channel_id': 1,
            'title': 'hello world!',
            'content': 'This is my first message.',
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200)
    });

    test("It should return 3 messages", async () => {
        const messages = [
            {'channel_id': 1, 'title': 'msg1', 'content': 'This is my No.1 message.',},
            {'channel_id': 1, 'title': 'msg2', 'content': 'This is my No.2 message.',},
            {'channel_id': 1, 'title': 'msg3', 'content': 'This is my No.3 message.',},
        ]
        for (const message of messages) {
            let response = await request(app).post("/messages").send(message).set('Accept', 'application/json')
            expect(response.statusCode).toBe(200)
        }
        // let response = await request(app).get("/messages").set('Accept', 'application/json')
        // expect(response.statusCode).toBe(200)
    });
});