import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts } from "../controller/post.controller.js";

const router = Router();

router.route("/").get(getAllPosts).post(validateAccessToken, createPost);

export default router;
