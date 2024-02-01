import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  addRemoveFriends,
  getUser,
  getUserFriends,
} from "../controllers/users.js";
const userRoutes = express.Router();

userRoutes.get("/:id", authenticate, getUser);
userRoutes.get("/:id/friends", authenticate, getUserFriends);
userRoutes.patch("/:id/:friendId", authenticate, addRemoveFriends);

export default userRoutes;
