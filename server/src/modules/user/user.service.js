import User from "./user.model.js";
class UserService {
  constructor() {
    this.userModel = User;
  }

  async getAllUsers() {
    const users = await this.userModel.find();

    return {
      message: "Success",
      count: users.length,
      data: users,
    };
  }

  async createUser(name) {
    const newUser = await this.userModel.create({ name });

    return {
      message: "Yaratildi",
      data: newUser,
    };
  }
}

export default new UserService();
