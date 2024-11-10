import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getUserPosts,
  updatePost,
} from "../controller/post.controller.js";

const router = Router();

router.route("/").get(getAllPosts).post(validateAccessToken, createPost);

router.route("/user/:userId").get(getUserPosts);

router
  .route("/:postId")
  .get(getPostById)
  .patch(validateAccessToken, updatePost)
  .delete(validateAccessToken, deletePost);

export default router;
