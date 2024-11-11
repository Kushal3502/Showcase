import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth.middleware.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getUserProjects,
  updateProject,
} from "../controller/project.controller.js";

const router = Router();

router.route("/").get(getAllProjects).post(validateAccessToken, createProject);

router.route("/user/:userId").get(getUserProjects);

router
  .route("/:projectId")
  .get(getProjectById)
  .patch(validateAccessToken, updateProject)
  .delete(validateAccessToken, deleteProject);

export default router;
