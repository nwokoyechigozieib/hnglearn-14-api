class UserService {
  constructor(storage) {
    this.storage = storage;
  }
  async filterusers({ q = null, page = 1, limit = 10 }) {
    return await this.storage.filterusers({ q, page, limit });
  }

  async getUserById(id) {
    return await this.storage.getUserById(id);
  }

  async createUser({ name, email }) {
    if (await this.storage.getUserByEmail(email)) {
      return { error: "Email already exists", status: 400, data: null };
    }

    const newUser = await this.storage.createUser({ name, email });

    return { message: "User created successfully", status: 201, data: newUser };
  }

  async updateUser(id, { name, email }) {
    const user = await this.storage.getUserById(id);
    if (!user) {
      return { error: "User not found", status: 404, data: null };
    }

    if (email) {
      const existingUser = await this.storage.getUserByEmail(email);
      if (existingUser && existingUser.id !== id) {
        return { error: "Email already exists", status: 400, data: null };
      }
    }

    const updatedUser = await this.storage.updateUser(id, { name, email });
    return {
      message: "User updated successfully",
      status: 200,
      data: updatedUser,
    };
  }

  async deleteUser(id) {
    const user = await this.storage.getUserById(id);
    if (!user) {
      return { error: "User not found", status: 404, data: null };
    }

    await this.storage.deleteUser(id);
    return { message: "User deleted successfully", status: 200, data: null };
  }
}

export default UserService;
