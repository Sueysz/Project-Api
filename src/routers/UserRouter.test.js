import { describe, it, expect, beforeAll } from "vitest";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import { UserModel } from "../models/UserModel";
import { createTokenAdmin } from "../createTokenAdmin.js";

describe("GET /users", () => {
    const request = supertest(app);

    beforeAll(async () => {
        await mongoose.connect(globalThis.__MONGO_URI__);
    });

    it("[403] returns an forbiden if do not have token", async () => {
        const response = await request.get("/users").send();

        expect(response.status).toEqual(403);
        expect(response.body).toEqual("Forbidden");
    });

    it("[404] returns error if there are no users", async () => {

        const adminToken = createTokenAdmin();
        console.log(adminToken);
        const response = await request.get("/users").set("authorization", `${adminToken}`).send();

        expect(response.status).toEqual(404);

    });
});


