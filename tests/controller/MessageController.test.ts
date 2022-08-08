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
        await AppDataSource.manager.save(
            AppDataSource.manager.create(Channel, {
                name: 'Work',
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

    test("It should failed for not existed channel", async () => {
        let response = await request(app).post("/messages").send({
            'channel_id': 1000,
            'title': 'hello world!',
            'content': 'This is my first message.',
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(2)
    });

    test("It should create 3 messages", async () => {
        const messages = [
            {'channel_id': 1, 'title': 'msg1', 'content': 'This is my No.1 message.',},
            {'channel_id': 1, 'title': 'msg2', 'content': 'This is my No.2 message.',},
            {'channel_id': 2, 'title': 'msg3', 'content': 'This is my No.3 message.',},
        ]
        for (const message of messages) {
            let response = await request(app).post("/messages").send(message).set('Accept', 'application/json')
            expect(response.statusCode).toBe(200)
        }
    });
    test("It should return 4 messages", async () => {
        let response = await request(app).get("/messages")
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(4)
    });
    test("It should return 3 messages on page_size = 3", async () => {
        let response = await request(app).get("/messages?page_size=3")
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(3)
        expect(response.body.total).toBe(4)
        expect(response.body.total_page).toBe(2)
        expect(response.body.page).toBe(1)
    });
    test("It should return 3 messages on channel = 1", async () => {
        let response = await request(app).get("/messages?channel_id=1")
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(3)
        expect(response.body.total).toBe(3)
        expect(response.body.total_page).toBe(1)
        expect(response.body.page).toBe(1)
    });
});