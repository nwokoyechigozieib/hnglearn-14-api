import UserRepository from "../abstracts/user.abstracts.js";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("User", UserSchema);

class User extends UserRepository {
  async filterusers({ q = null, page = 1, limit = 10 }) {
    const users = await UserModel.find(
      q ? { name: new RegExp(q, "i"), email: new RegExp(q, "i") } : {},
      null,
      { skip: (page - 1) * limit, limit },
    );

    return users;
  }

  async getUserById(id) {
    return await UserModel.findById(id);
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async createUser({ name, email }) {
    return await UserModel.create({ name, email });
  }

  async updateUser(id, { name, email }) {
    const user = await UserModel.findById(id);

    if (!name && !email) {
      return user; // No changes, return existing user
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    user.updatedAt = Date.now();
    return await user.save();
  }

  async deleteUser(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default User;
