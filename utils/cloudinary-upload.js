import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (imagePath) => {
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};
