import jwt from "jsonwebtoken";

export const generateRefreshToken = (res, user) => {
  const refreshToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return refreshToken;
};

export const generateAccessToken = (res, user) => {
  const accessToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return accessToken;
};

export const validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log("Invalid or expired token :: ", error);
  }
};

export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.log("Token decode falied :: ", error);
  }
};
