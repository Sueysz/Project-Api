import { describe, it, expect, beforeAll } from "vitest";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import { UserModel } from "../models/UserModel";

describe("GET /users", () => {
    const request = supertest(app);

    beforeAll(async () => {
        await mongoose.connect(globalThis.__MONGO_URI__);
    });

    it("[200] returns an empty list if there is no users", async () => {
        const response = await request.get("/users").send();

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([]);
    });

    it("[200] returns a list if there are users", async () => {
        const users = await UserModel.create({
            email: "test@test.test",
            username: "test",
            role: ["user"],
          });
          const response = await request.get("/user").send();

          expect(response.status).toEqual(200);
          expect(response.body).toHaveLength(1);
          expect(response.body[0]).toMatchObject({
            username:"test",
          });
    });
});