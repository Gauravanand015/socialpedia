import express from "express";
import { authenticate } from "../middleware/auth";
import { getFeedPosts, getUserPost, likePost } from "../controllers/posts.js";
const postRoutes = express.Router();

postRoutes.get("/", authenticate, getFeedPosts);
postRoutes.get("/:userId/posts", authenticate, getUserPost);
postRoutes.patch("/:id/like", authenticate, likePost);

export default postRoutes;
