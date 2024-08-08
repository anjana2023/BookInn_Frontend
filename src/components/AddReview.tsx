import React, { useState, useEffect, useRef } from "react";
import ReactStars from "react-rating-stars-component";
import uploadImagesToCloudinary from "../api/imageUpload";
import { USER_API } from "../constants";
import showToast from "../utils/toast";
import axiosJWT from "../utils/axiosService";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: any;
}

const AddReview: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [descriptionError, setDescriptionError] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    setDescriptionError(e.target.value.trim() === "");
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    if (images.length + selectedFiles.length > 5) {
      alert(`You can only upload up to 5 images.`);
      return;
    }

    setUploading(true);

    try {
      const uploadedUrls = await uploadImagesToCloudinary(
        Array.from(selectedFiles)
      );
      const newImages = uploadedUrls.map((url, index) => ({
        file: selectedFiles[index],
        url,
      }));
      setImages([...images, ...newImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(`Failed to upload images. Please try again.`);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setRatingError(newRating === 0);
  };

  const handleSubmit = async () => {
    const isDescriptionEmpty = description.trim() === "";
    const isRatingEmpty = rating === 0;

    setDescriptionError(isDescriptionEmpty);
    setRatingError(isRatingEmpty);

    if (isDescriptionEmpty || isRatingEmpty || uploading) {
      return;
    }

    // Handle form submission logic here
    await axiosJWT
      .post(`${USER_API}/addRating`, {
        hotelId: id,
        rating,
        description,
        imageUrls: images.map((img) => img.url),
      })
      .then(({ data }) => {
        showToast(data.message);
      })
      .catch(({ response }) => {
        showToast(response?.data?.message, "error");
      });

    // Close the modal
    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
        <div className="px-12 py-5">
          <h2 className="text-gray-800 text-3xl font-semibold">
            Give us feedback!
          </h2>
        </div>
        <div className="bg-white-100 w-full flex flex-col items-center">
          <div className="flex flex-col items-center py-4 space-y-3">
            <span className="text-lg text-gray-800">
              How is your experience?
            </span>
            <div className="flex space-x-3">
              <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            {ratingError && (
              <span className="text-red-500 text-sm">Rating is required</span>
            )}
          </div>
          <div className="w-3/4 flex flex-col">
            <textarea
              rows={3}
              className={`p-4 text-gray-500 rounded-xl resize-none ${
                descriptionError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Description..."
              value={description}
              onChange={handleDescriptionChange}
            />
            {descriptionError && (
              <span className="text-red-500 text-sm">
                Description cannot be empty
              </span>
            )}
            <div className="mt-2">
              <label className="block mb-1 text-sm text-gray-600">
                Add images
              </label>
            </div>
            <div className="flex mt-2 space-x-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image.file)}
                    alt={`Preview ${index}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      multiple
                    />
                    <span className="text-gray-500 text-2xl">+</span>
                  </label>
                </div>
              )}
            </div>
            {uploading && (
              <div className="mt-2">
                <span className="text-gray-500">Uploading...</span>
              </div>
            )}
            <button
              disabled={uploading}
              onClick={handleSubmit}
              className="py-3 my-8 text-lg bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white"
            >
              Rate now
            </button>
          </div>
        </div>
        <div
          onClick={handleClose}
          className="h-16 flex items-center justify-center"
        >
          <a href="#" className="text-gray-600">
            Maybe later
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
