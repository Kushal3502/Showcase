import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth.middleware.js";
import { createPost } from "../controller/post.controller.js";

const router = Router();

router.use(validateAccessToken);

router.route("/").post(createPost);

export default router;
