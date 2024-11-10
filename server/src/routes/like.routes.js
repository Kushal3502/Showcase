import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth.middleware.js";
import {
  toggleCommentLike,
  togglePostLike,
  toggleProjectLike,
} from "../controller/like.controller.js";

const router = Router();

router.use(validateAccessToken);

router.route("/post/:postId").post(togglePostLike);

router.route("/comment/:commentId").post(toggleCommentLike);

router.route("/project/:projectId").post(toggleProjectLike);

export default router;
