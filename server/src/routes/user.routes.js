import { Router } from "express";
import {
  login,
  logout,
  refreshAccessToken,
  registerUser,
} from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh-access-token").post(refreshAccessToken);

export default router;
