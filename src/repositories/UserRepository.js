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

  async getByEmail(email) {
    try {
      return await UserModel.findOne({ email: email});
    } catch (error) {
      if (error.message.startsWith('Cast to ObjectId failed for value "')) {
        return null
      }
      throw error
    }
  }

  async getById(id) {
    try {
      return await UserModel.findOne({ _id: id });
    } catch (error) {
      if (error.message.startsWith('Cast to ObjectId failed for value "')) {
        return null
      }
      throw error
    }

  }
  async deleteUser(id) {
    const { deletedCount } = await UserModel.deleteOne({ _id: id })
    if (deletedCount !== 1) {
      throw new Error("user not found");
    }
  }

  async createUser(payload) {
    const user = await UserModel.create(payload);

    return user;
  }

  async updateUser(id, payload) {
    try {
      return await UserModel.findOneAndUpdate(
        {
          _id: id,
        },
        payload
      );
    } catch (error) {
      if (error.message.startsWith('Cast to ObjectId failed for value "')) {
        return null
      }
      throw error
    }

  }

}

export default new UserRepository();
