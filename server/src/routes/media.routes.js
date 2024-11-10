import { Router } from "express";
import { validateAccessToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteMedia, uploadMedia } from "../controller/media.controller.js";

const router = Router();

router.use(validateAccessToken);

router.route("/").post(upload.single("media"), uploadMedia);

router.route("/:type/:publicId").delete(deleteMedia);

export default router;
