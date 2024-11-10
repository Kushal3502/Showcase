import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log(response);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.log("Cloudinary upload error :: ", error);
  }
};

const deleteFromCloudinary = async (type = "image", publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
    });

    return response;
  } catch (error) {
    console.log("Cloudinary delete error :: ", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
