import { Post } from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { content, image } = req.body;

  if (!content || !image)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const newPost = await Post.create({
      content,
      owner: req.user?._id,
      image,
    });

    if (!newPost)
      return res
        .status(400)
        .json({ success: false, message: "Post not created" });

    return res.status(201).json({
      success: true,
      post: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getAllPosts = async (req, res) => {};

export const getUserPosts = async (req, res) => {};

export const getPostById = async (req, res) => {};

export const updatePost = async (req, res) => {};

export const deletePost = async (req, res) => {};
