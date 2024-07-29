import React from "react";
import useOwnerProfile from "../../hooks/owner/OwnerProfile";

const OwnerProfile = () => {
  const {
    profile,
    formData,
    nameError,
    phoneError,
    imagePreview,
    handleInputChange,
    handleSubmit,
  } = useOwnerProfile();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-6 bg-gray-100 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center w-full max-w-lg p-6 mb-3 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-800">
        <img
          src={
            imagePreview
              ? imagePreview
              : profile?.profilePic ?? "https://picsum.photos/200"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md object-cover"
        />
        <label
          htmlFor="profile-image"
          className="absolute px-2 py-1 text-white bg-orange-500 border-2 border-orange-500 rounded-full cursor-pointer -bottom-2 right-2"
        >
          Change Pic
          <input
            type="file"
            id="profile-image"
            name="imageFile"
            className="hidden"
            accept="image/*"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="flex flex-col w-full max-w-lg p-6 mb-3 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-800">
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 text-black border border-blue-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.name}
            name="name"
            onChange={handleInputChange}
          />
        </div>
        {nameError && <p className="text-red-500">{nameError}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 text-black border border-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData?.email ?? ""}
            name="email"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-semibold text-white">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="w-full px-3 py-2 text-black border border-gray-800 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData?.phone ?? ""}
            name="phone"
            onChange={handleInputChange}
          />
        </div>
        {phoneError && <p className="text-red-500">{phoneError}</p>}

        <button
          onClick={handleSubmit}
          className="py-2 mt-3 text-white bg-orange-500 rounded-md px-4 hover:bg-orange-400 focus:outline-none focus:ring focus:border-orange-500"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default OwnerProfile;
