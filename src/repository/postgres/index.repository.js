import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
import User from "./postgres.user.js";
import Repository from "../abstracts/index.abstracts.js";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

class PostgresStore extends Repository {
  static User = new User(prisma);
  constructor() {
    super();
    this.User = new User(prisma);
  }
}

export default PostgresStore;
