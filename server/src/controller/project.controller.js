import mongoose from "mongoose";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

export const createProject = async (req, res) => {
  const { title, thumbnail, githubRepo, liveUrl, content, category } = req.body;

  if (
    [title, thumbnail, githubRepo, liveUrl, content].some(
      (value) => value?.trim() === ""
    )
  )
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const newProject = await Project.create({
      title,
      thumbnail,
      githubRepo,
      liveUrl,
      category,
      content,
      owner: req.user?.id,
    });

    if (!newProject)
      return res
        .status(400)
        .json({ success: false, message: "Project not created" });

    return res.status(201).json({
      success: true,
      project: newProject,
      message: "Project created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getAllProjects = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const projects = await Project.aggregate([
      {
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

    if (!projects || projects.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No project found" });

    return res.status(200).json({
      success: true,
      projects,
      message: "Projects fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getUserProjects = async (req, res) => {
  const { userId } = req.params;

  if (!userId)
    return res.status(400).json({ success: false, message: "Invalid userId" });

  try {
    // check if user exists or not
    const isUserExists = await User.findById(userId);

    if (!isUserExists)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    // find posts
    const projects = await Project.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
        },
      },
      {
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
    ]);

    if (!projects || projects.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No project found" });

    return res.status(200).json({
      success: true,
      projects,
      message: "Projects fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid projectId" });

  try {
    const project = await Project.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(projectId),
        },
      },
      {
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
    ]);

    if (!project)
      return res
        .status(400)
        .json({ success: false, message: "No project found" });

    return res.status(200).json({
      success: true,
      project: project[0],
      message: "Project fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid projectId" });

  try {
    const project = await Project.findById(projectId);

    if (!project)
      return res
        .status(400)
        .json({ success: false, message: "Project not found" });

    const { title, content, thumbnail, category } = req.body;
    const updatedFields = {};

    if (title !== undefined) updatedFields.title = title;
    if (category !== undefined) updatedFields.category = category;
    if (thumbnail !== undefined) updatedFields.thumbnail = thumbnail;
    if (content !== undefined) updatedFields.content = content;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $set: updatedFields,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      project: updatedProject,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId)
    return res
      .status(400)
      .json({ success: false, message: "Invalid projectId" });

  try {
    const project = await Project.findById(projectId);

    if (!project)
      return res
        .status(400)
        .json({ success: false, message: "Project not found" });

    await Project.findByIdAndDelete(projectId);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
