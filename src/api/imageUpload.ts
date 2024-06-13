import { CLOUDINARY_UPLOAD_API, cloudinaryUploadPreset } from "../constants";
import showToast from "../utils/toast";
import axios from "axios";

const uploadImagesToCloudinary = async (
  imagesFile: File[]
): Promise<string[]> => {
  try {
    console.log("Images to upload:", imagesFile.length);

    const promises = imagesFile.map(async file => {
      console.log("Uploading image:", file.name);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await axios.post(CLOUDINARY_UPLOAD_API, formData, {
        withCredentials: false, // Ensure credentials are not included
      });
      console.log(response, "response");
      console.log(response, "response");
      console.log(response, "response");
      console.log(response, "response");


      if (!response) {
        throw new Error("Failed to upload the image to Cloudinary");
      }
      const data = response.data;
      return data.secure_url;
    });

    const uploadImageUrls = await Promise.all(promises);
    console.log("Upload complete...........:", uploadImageUrls);
    console.log("Upload complete:", uploadImageUrls);
    console.log("Upload complete:", uploadImageUrls);
    console.log("Upload complete:", uploadImageUrls);


    return uploadImageUrls;
  } catch (error) {
    showToast("Error uploading images to Cloudinary", "error");
    throw error; // Rethrow the error to be caught by the caller
  }
};

export default uploadImagesToCloudinary;
