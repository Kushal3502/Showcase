import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

export const uploadMedia = async (req, res) => {
  try {
    const mediaLocalPath = req.file.path;

    const response = await uploadOnCloudinary(mediaLocalPath);

    console.log(response);

    if (!response)
      return res
        .status(400)
        .json({ success: false, message: "Media upload failed" });

    return res.status(200).json({
      success: true,
      data: response,
      message: "Media uploaded successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteMedia = async (req, res) => {
  const { type, publicId } = req.params;

  if (!type || !publicId)
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });

  try {
    const response = await deleteFromCloudinary(type, publicId);

    if (!response)
      return res
        .status(400)
        .json({ success: false, message: "Media delete failed" });

    return res.status(200).json({
      success: true,
      message: "Media deleteded successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
