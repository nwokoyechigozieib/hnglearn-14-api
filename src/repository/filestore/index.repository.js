import User from "../filestore/filestore.repository.js";
import Repository from "../abstracts/index.abstracts.js";

class FileStore extends Repository {
  static User = new User();
  constructor() {
    super();
    this.User = new User();
  }
}

export default FileStore;
