import "dotenv/config";
import User from "./mongodb.user.js";
import Repository from "../abstracts/index.abstracts.js";
import mongoose from "mongoose";

const connectionString = `${process.env.MONGO_DATABASE_URL}`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

mongoose
  .connect(connectionString, clientOptions)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(console.error);

class MongoDBStore extends Repository {
  static User = new User();
  constructor() {
    super();
    this.User = new User();
  }
}

export default MongoDBStore;
