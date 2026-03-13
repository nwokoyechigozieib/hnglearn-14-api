class UserRepository {
  constructor() {}

  async filterusers({ q = null, page = 1, limit = 10 }) {
    throw new Error("Not Implemented");
  }

  async getUserById(id) {
    throw new Error("Not Implemented");
  }

  async getUserByEmail(email) {
    throw new Error("Not Implemented");
  }

  async createUser({ name, email }) {
    throw new Error("Not Implemented");
  }

  async updateUser(id, { name, email }) {
    throw new Error("Not Implemented");
  }

  async deleteUser(id) {
    throw new Error("Not Implemented");
  }
}

export default UserRepository;
