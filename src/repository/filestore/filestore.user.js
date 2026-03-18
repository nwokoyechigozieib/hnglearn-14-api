import UserRepository from "../abstracts/user.abstracts.js";
import fs from "fs";

class User extends UserRepository {
  constructor() {
    super();
    this.lastIdFilePath = "./src/repository/filestore/data/last.json";
    this.usersFilePath = "./src/repository/filestore/data/users.json";
  }

  async readUsersFromFile() {
    try {
      const data = fs.readFileSync(this.usersFilePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading users file:", err);
      return [];
    }
  }

  async getLastId() {
    try {
      const data = fs.readFileSync(this.lastIdFilePath, "utf-8");
      const lastIdData = JSON.parse(data);
      return lastIdData.lastId;
    } catch (err) {
      console.error("Error reading last ID file:", err);
      return 0;
    }
  }

  async updateLastId(newId) {
    const lastIdData = { lastId: newId };
    fs.writeFileSync(this.lastIdFilePath, JSON.stringify(lastIdData, null, 2));
  }

  async incrementLastId() {
    const lastId = await this.getLastId();
    const newId = lastId + 1;
    await this.updateLastId(newId);
    return newId;
  }

  async writeUsersToFile(users) {
    fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2));
  }

  async filterusers({ q = null, page = 1, limit = 10 }) {
    let users = await this.readUsersFromFile();
    if (q) {
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(q.toLowerCase()) ||
          user.email.toLowerCase().includes(q.toLowerCase()),
      );
    }

    const offset = (page - 1) * limit;
    const endIndex = offset + limit;
    const paginatedUsers = users.slice(offset, endIndex);
    return paginatedUsers;
  }

  async getUserById(id) {
    const users = await this.readUsersFromFile();
    const user = users.find((us) => us.id === id);
    return user;
  }

  async getUserByEmail(email) {
    const users = await this.readUsersFromFile();
    const user = users.find((us) => us.email === email);
    return user;
  }

  async createUser({ name, email }) {
    const id = await this.incrementLastId();
    const newUser = { id, name, email };
    const users = await this.readUsersFromFile();
    users.push(newUser);
    await this.writeUsersToFile(users);
    return newUser;
  }

  async updateUser(id, { name, email }) {
    const users = await this.readUsersFromFile();
    const userIndex = users.findIndex((us) => us.id === id);
    const user = users[userIndex];
    users[userIndex] = { ...user, name, email };
    await this.writeUsersToFile(users);
    return users[userIndex];
  }

  async deleteUser(id) {
    const users = await this.readUsersFromFile();
    const userIndex = users.findIndex((us) => us.id === id);
    const deletedUser = users.splice(userIndex, 1)[0];
    await this.writeUsersToFile(users);
    return deletedUser;
  }
}

export default User;
