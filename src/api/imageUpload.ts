import { CLOUDINARY_UPLOAD_API, cloudinaryUploadPreset } from "../constants";
import showToast from "../utils/toast";

const uploadImagesToCloudinary = async (imageFiles: File | File[]) => {
  try {
    const files = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    const uploadPromises = files.map(async (imageFile) => {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await fetch(CLOUDINARY_UPLOAD_API, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to upload image to Cloudinary: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data.secure_url;
    });

    return Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    showToast("Error uploading image to Cloudinary", "error");
    throw error;
  }
};

export default uploadImagesToCloudinary;
