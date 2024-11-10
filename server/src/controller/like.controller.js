import { Like } from "../models/like.model.js";

export const togglePostLike = async (req, res) => {
  const { postId } = req.params;

  if (!postId)
    return res.status(400).json({ success: false, message: "Invalid postId" });

  try {
    const isLiked = await Like.findOne({
      likedBy: req.user?.id,
      post: postId,
    });

    if (isLiked) {
      await Like.findByIdAndDelete(isLiked._id);

      return res.status(200).json({ success: true, message: "Like removed" });
    } else {
      await Like.create({
        likedBy: req.user?.id,
        post: postId,
      });

      return res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const toggleCommentLike = async (req, res) => {
  const { commentId } = req.params;

  if (!commentId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid commentId" });

  try {
    const isLiked = await Like.findOne({
      likedBy: req.user?.id,
      comment: commentId,
    });

    if (isLiked) {
      await Like.findByIdAndDelete(isLiked._id);

      return res.status(200).json({ success: true, message: "Like removed" });
    } else {
      await Like.create({
        likedBy: req.user?.id,
        comment: commentId,
      });

      return res.status(200).json({ success: true, message: "Comment liked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const toggleProjectLike = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid projectId" });

  try {
    const isLiked = await Like.findOne({
      likedBy: req.user?.id,
      project: projectId,
    });

    if (isLiked) {
      await Like.findByIdAndDelete(isLiked._id);

      return res.status(200).json({ success: true, message: "Like removed" });
    } else {
      await Like.create({
        likedBy: req.user?.id,
        project: projectId,
      });

      return res.status(200).json({ success: true, message: "Project liked" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
