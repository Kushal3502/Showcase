import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
  validateToken,
} from "../utils/generateTokens.js";

export const registerUser = async (req, res) => {
  const { username, avatar, password } = req.body;

  if (!username || !avatar || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const isUserAlreadyExists = await User.findOne({ username });

    if (isUserAlreadyExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      avatar,
      password: hashedPassword,
    });

    const newUser = await User.findById(user._id).select("-password");

    if (!newUser)
      return res
        .status(400)
        .json({ success: false, message: "User not created" });

    return res.status(201).json({
      success: true,
      user: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    generateRefreshToken(res, user);
    generateAccessToken(res, user);

    const currUser = await User.findById(user._id).select("-password");

    if (!currUser)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    return res.status(201).json({
      success: true,
      user: currUser,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

export const checkAuth = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token && validateToken(token)) {
    const user = decodeToken(token);
    return res.status(200).json({ success: true, currentUser: user });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "User not authenticated" });
  }
};

export const refreshAccessToken = (req, res) => {
  if (!req.cookies.accessToken) {
    const token = req.cookies.refreshToken;

    if (!token)
      return res.status(401).json({ success: false, message: "Invalid token" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized request" });

      const accessToken = generateAccessToken(res, user);

      res.json({ accessToken });
    });
  } else {
    return res.status(200).json({ message: "Access token is still valid" });
  }
};
