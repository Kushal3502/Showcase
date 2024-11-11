import { Comment } from "../models/comment.model.js";

export const addComment = async (req, res) => {
  const { content, parent, post, project } = req.body;

  if (!content)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const newComment = await Comment.create({
      content,
      owner: req.user?.id,
      parent: parent || null,
      post: post || null,
      project: project || null,
    });

    if (!newComment)
      return res.status(400).json({
        success: false,
        message: "Comment not added",
      });

    //   if it is a reply
    if (parent)
      await Comment.findByIdAndUpdate(parent, {
        $push: { replies: newComment._id },
      });

    return res.status(201).json({
      success: true,
      comment: newComment,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  if (!postId)
    return res.status(400).json({ success: false, message: "Invalid postId" });

  try {
    const comments = await Comment.find({ post: postId }).populate(
      "owner",
      "username avatar"
    );
    console.log(comments);
    if (!comments || comments.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No comments found" });

    return res.status(200).json({
      success: true,
      comments,
      message: "Comments fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getProjectComments = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid projectId" });

  try {
    const comments = await Comment.find({ project: projectId }).populate(
      "owner",
      "username avatar"
    );
    console.log(comments);
    if (!comments || comments.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No comments found" });

    return res.status(200).json({
      success: true,
      comments,
      message: "Comments fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  if (!commentId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid commentId" });

  try {
    const comment = await Comment.findById(commentId)
      .populate("owner", "username avatar")
      .populate({
        path: "replies",
        populate: { path: "owner", select: "username avatar" },
      });

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    return res.status(200).json({ success: true, comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updateComment = async (req, res) => {
  const { commentId } = req.params;

  if (!commentId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid commentId" });

  try {
    const comment = await Comment.findById(commentId);

    if (!comment)
      return res
        .status(400)
        .json({ success: false, message: "Comment not found" });

    const { content } = req.body;

    if (!content?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Content cannot be empty" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: { content },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      comment: updatedComment,
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  if (!commentId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid commentId" });

  try {
    const comment = await Comment.findById(commentId);

    if (!comment)
      return res
        .status(400)
        .json({ success: false, message: "Comment not found" });

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
