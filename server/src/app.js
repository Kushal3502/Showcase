import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ limit: "16kb", extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import mediaRouter from "./routes/media.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/media", mediaRouter);

export default app;
