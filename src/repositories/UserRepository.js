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
    
}

export default new UserRepository();
