import { UserModel } from "../models/UserModel.js";

class UserRepository {
    async listUser() {
        const users = await UserModel.find(
          {},
          {
            email: true,
            pseudo: true,
            password: true,
            role: true,
          }
        );
        return users;
      }
    async getById(id) {
      return await UserModel.findById(id);
    }
    async deleteUser(id) {
      const { deletedCount } = await UserModel.deleteOne({_id: id})
      if (deletedCount !== 1) {
        throw new Error("user not found");
      }
    }

    async createUser(payload) {
      const user = await UserModel.create(payload);
  
      return user;
    }

    async updateUser(id, payload) {
      const upUser = await UserModel.findOneAndUpdate(
        {
          _id: id,
        },
        payload
      );
      return upUser;
    }
}

export default new UserRepository();
