import { CLOUDINARY_UPLOAD_API, cloudinaryUploadPreset } from "../constants";
import showToast from "../utils/toast";
import axios from "axios";

const uploadImagesToCloudinary = async (
  imagesFile: File[]
): Promise<string[]> => {
  try {

    const promises = imagesFile.map(async file => {

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await axios.post(CLOUDINARY_UPLOAD_API, formData, {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        }, 
      });
      if (!response.data || !response.data.secure_url) {
        throw new Error("Failed to upload the file to Cloudinary");
      }
      const data = response.data;
      return data.secure_url;
    });

    const uploadImageUrls = await Promise.all(promises);
  
    return uploadImageUrls;
  } catch (error) {
    showToast("Error uploading images to Cloudinary", "error");
    throw error; // Rethrow the error to be caught by the caller
  }
};

export default uploadImagesToCloudinary;
