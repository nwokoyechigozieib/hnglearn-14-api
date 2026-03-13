import UserRepository from "./user.abstracts.js";

class Repository {
  static User = new UserRepository();
}

export default Repository;
