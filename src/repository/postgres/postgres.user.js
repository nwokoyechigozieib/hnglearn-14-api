import UserRepository from "../abstracts/user.abstracts.js";

class User extends UserRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async filterusers({ q = null, page = 1, limit = 10 }) {
    const where = q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
          ],
        }
      : {};

    const users = await this.prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return users;
  }

  async getUserById(id) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async createUser({ name, email }) {
    return await this.prisma.user.create({ data: { name, email } });
  }

  async updateUser(id, { name, email }) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!name && !email) {
      return user; // No changes, return existing user
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    return await this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async deleteUser(id) {
    return await this.prisma.user.delete({ where: { id } });
  }
}

export default User;
