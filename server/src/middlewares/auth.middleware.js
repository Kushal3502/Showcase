import jwt from "jsonwebtoken";

export const validateAccessToken = (req, res, next) => {
  // get token from headers
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  // check for invalid token
  if (!token)
    return res.status(401).json({ success: false, message: "Invalid token" });

  // verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized request" });

    req.user = user;
    next();
  });
};
