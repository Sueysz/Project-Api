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
        const response = await request
            .get("/users")
            .send();

        expect(response.status).toEqual(403);
        expect(response.body).toEqual("Forbidden");
    });

    it("[404] returns error if there are no users", async () => {

        const adminToken = createTokenAdmin();
        console.log(adminToken);
        const response = await request.get("/users").set("authorization", `${adminToken}`).send();

        expect(response.status).toEqual(404);

    });

    describe("POST /users", () => {
        it("[201] creates a new user", async () => {
            const newUser = {
                username: "newuser",
                email: "newuser@example.com",
                password: "newpassword",
                role: "User",
            };

            const response = await request
                .post("/users")
                .send(newUser);

            expect(response.status).toEqual(201);
        });
    });

    describe("PUT /users/:id", () => {
        it("[200] updates a user by ID", async () => {
            const userToUpdate = await UserModel.create({
                username: "updateuser",
                email: "updateuser@example.com",
                password: "updatepassword",
                role: "User",
            });

            const updatedUserData = {
                username: "updateduser",
                email: "updateduser@example.com",
                role: "Admin",
            };

            const adminToken = createTokenAdmin();
            const response = await request
                .put(`/users/${userToUpdate._id}`)
                .set("authorization", `Bearer ${adminToken}`)
                .send(updatedUserData);

            expect(response.status).toEqual(200);
        });

    });

    describe("DELETE /users/delete/:id", () => {
        it("[204] deletes a user by ID", async () => {
            const userToDelete = await UserModel.create({
                username: "deleteuser",
                email: "deleteuser@example.com",
                password: "deletepassword",
                role: "User",
            });

            console.log(userToDelete);

            const adminToken = createTokenAdmin();
            
            const response = await request
                .delete(`/users/delete/${userToDelete._id}`)
                .set("authorization", `Bearer ${adminToken}`)
                .send()
                console.log(response);
            expect(response.status).toEqual(204);
            
            const deletedUser = await UserModel
                .findById(userToDelete._id);

            expect(deletedUser).toBeNull()
        });

    });
});