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

    test("It should return a list containing 2 items", async () => {
        const response = await request(app).get("/channels")
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(2)
    });

    test("It should return a list containing 3 items", async () => {
        const response = await request(app).post("/channels").field('name', 'Baby')
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(3)
    });
});