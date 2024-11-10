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
      owner: req.user?.id,
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

export const getAllPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Post.aggregate([
      {
        //   adds the user field to data
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                username: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$owner",
      },
      {
        $sort: { createdAt: -1 }, // Sort by the latest posts
      },
      {
        $skip: (page - 1) * limit, // Pagination: skip previous pages
      },
      {
        $limit: parseInt(limit), // Limit the number of results per page
      },
    ]);

    if (!posts || posts.length === 0)
      return res.status(400).json({ success: false, message: "No post found" });

    return res
      .status(200)
      .json({ success: true, posts, message: "Posts fetched successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getUserPosts = async (req, res) => {};

export const getPostById = async (req, res) => {};

export const updatePost = async (req, res) => {};

export const deletePost = async (req, res) => {};
