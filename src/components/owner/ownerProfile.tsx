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
    <div className="flex flex-col w-screen h-screen overflow-hidden items-center justify-center bg-gray-100">
      <div className="bg-gray-800 max-w-lg w-full p-6 mb-3 rounded-lg shadow-lg flex flex-col items-center relative border-2 border-gray-800">
        <img
          src={
            imagePreview
              ? imagePreview
              : profile?.profilePic ?? "https://picsum.photos/200"
          }
          alt="Profile"
          className="h-32 w-32 rounded-full object-cover border-4 border-white bg-white shadow-md"
        />
        <label
          htmlFor="profile-image"
          className="absolute bottom-0  bg-gray-800 right-0 bg-orange-500 text-white rounded-full cursor-pointer border-2 border-orange-500 px-2 py-1"
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

      <div className="bg-gray-800 max-w-lg w-full p-6 mb-3 rounded-lg shadow-lg border-2 border-gray-800">
        <div className="mb-4">
          <label htmlFor="name" className="block text-white font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="border text-black border-blue-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            value={formData.name}
            name="name"
            onChange={handleInputChange}
          />
        </div>
        {nameError && <p className="text-black-500">{nameError}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border text-black border-gray-800 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            value={formData?.email ?? ""}
            name="email"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-white font-semibold"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="border text-black border-gray-800 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            value={formData?.phone ?? ""}
            name="phone"
            onChange={handleInputChange}
          />
        </div>
        {phoneError && <p className="text-red-500">{phoneError}</p>}

        {/* Update Profile Button */}
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-orange-400 focus:outline-none focus:ring focus:border-orange-500"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default OwnerProfile;
