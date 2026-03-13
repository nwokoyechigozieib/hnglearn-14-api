import express, { Router } from "express";
// const router = express.Router();
const router = Router();
import UserController from "../controllers/user/user.controller.js";

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
