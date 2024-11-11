import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
