import { CreateUserSchema, UpdateUserSchema } from "../../schema/schema.js";
import UserService from "../../services/user/user.service.js";
import FileStore from "../../repository/filestore/index.repository.js";
import PostgresStore from "../../repository/postgres/index.repository.js";
import MongoDBStore from "../../repository/mongodb/index.repository.js";

const storage = FileStore.User;
// const storage = PostgresStore.User;
// const storage = MongoDBStore.User;

const userServiceInstance = new UserService(storage);

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // get all users
  getAllUsers = async (req, res) => {
    let { q, page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    console.log("UserService instance in getAllUsers:", this.userService);
    const response = await this.userService.filterusers({ q, page, limit });
    res.json(response);
  };

  // get user by id
  getUserById = async (req, res) => {
    const user = await this.userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  };

  // create a new user
  createUser = async (req, res) => {
    const data = await CreateUserSchema.safeParseAsync(req.body);
    if (!data.success) {
      return res
        .status(400)
        .json({ errors: data.error.issues.map((issue) => issue.message) });
    }

    const { name, email } = data.data;

    const response = await this.userService.createUser({ name, email });
    if (response.error) {
      return res.status(response.status).json({ message: response.error });
    }

    res.status(response.status).json(response.data);
  };

  // update a user
  updateUser = async (req, res) => {
    const id = req.params.id;

    const data = UpdateUserSchema.safeParse(req.body); // synchronous
    if (!data.success) {
      return res
        .status(400)
        .json({ errors: data.error.issues.map((issue) => issue.message) });
    }

    const { name, email } = data.data;

    const response = await this.userService.updateUser(id, { name, email });
    if (response.error) {
      return res.status(response.status).json({ message: response.error });
    }

    res.json(response.data);
  };

  // delete a user
  deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await this.userService.deleteUser(id);
    if (response.error) {
      return res.status(response.status).json({ message: response.error });
    }

    res.json({ message: response.message });
  };
}

export default new UserController(userServiceInstance);
