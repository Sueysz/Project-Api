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

    async deleteUser(id) {
      await UserModel.deleteOne({_id: id})
    }

    async createUser(payload) {
      const user = await UserModel.create(payload);
  
      return user;
    }
}

export default new UserRepository();
