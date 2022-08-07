import {AppDataSource} from "../../src/data-source";

const request = require("supertest");
const app = require("../../src/app");

describe("Test the root path", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    });
    afterAll(async () => {
        // connection must be destroyed or jest process will not exit
        await AppDataSource.destroy()
    });

    test("It should response the GET method", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});