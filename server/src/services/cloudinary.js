import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Validate local file path
    if (!localFilePath) {
      console.error("No file path provided");
      return null;
    }

    // Verify file exists
    if (!fs.existsSync(localFilePath)) {
      console.error(`File not found at path: ${localFilePath}`);
      return null;
    }

    // Attempt upload
    //("Attempting to upload file to Cloudinary:", localFilePath);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      timeout: 60000 
    });

    // Log success
    //console.log("File uploaded successfully to Cloudinary");
    //console.log("Cloudinary URL:", response.url);

    // Clean up local file
    try {
      fs.unlinkSync(localFilePath);
      //console.log("Local file cleaned up successfully");
    } catch (unlinkError) {
      console.error("Error cleaning up local file:", unlinkError.message);
    }

    return response;

  } catch (error) {
    console.error("Cloudinary Upload Error:");
    console.error("Error message:", error.message);
    console.error("Error details:", error);
    
    // Clean up local file on error
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
        //console.log("Local file cleaned up after error");
      }
    } catch (unlinkError) {
      console.error("Error cleaning up local file:", unlinkError.message);
    }

    return null;
  }
};

export { uploadOnCloudinary };