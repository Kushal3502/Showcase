import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getCommentById,
  getPostComments,
  getProjectComments,
  updateComment,
} from "../controller/comment.controller.js";

const router = Router();

router.route("/").post(validateAccessToken, addComment);

router.route("/post/:postId").get(getPostComments);

router.route("/project/:projectId").get(getProjectComments);

router
  .route("/:commentId")
  .get(getCommentById)
  .patch(validateAccessToken, updateComment)
  .delete(validateAccessToken, deleteComment);

export default router;
