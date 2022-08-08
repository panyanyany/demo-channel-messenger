import {AppDataSource} from "../../src/data-source";
import {Channel} from "../../src/entity/Channel";

const request = require("supertest");
const app = require("../../src/app");

describe("Test the channel path", () => {
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

    test("It should not create same model", async () => {
        const response = await request(app).post("/channels").send({'name': 'Work'})
        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(1)
    });

    test("It should return a list containing 2 items", async () => {
        const response = await request(app).get("/channels")
        expect(response.statusCode).toBe(200)
        expect(response.body.data.length).toBe(2)
    });

    test("It should create a new channel", async () => {
        let response = await request(app).post("/channels").send({'name': 'Baby'}).set('Accept', 'application/json')
        // let response = await request(app).post("/channels").send('name=Baby')
        expect(response.statusCode).toBe(200)
    });

    test("It should return a list containing 3 items", async () => {
        let response = await request(app).get("/channels")
        expect(response.body.data.length).toBe(3)
    });

    test("It should return an error", async () => {
        let response = await request(app).get("/channels/error")
        expect(response.statusCode).toBe(500)
        expect(response.body.code).toBe(-1)
    });
});