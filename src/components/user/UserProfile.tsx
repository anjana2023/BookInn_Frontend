import React from "react";
import useProfile from "../../hooks/user/UserProfile";

const UserProfile = () => {
  const {
    profile,
    formData,
    nameError,
    phoneError,
    imagePreview,
    handleInputChange,
    handleSubmit,
  } = useProfile();
  return (
    <div className="flex flex-col items-center justify-center h-screen ml-64 bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md bg-white p-6 rounded-lg shadow-lg relative">
        <div className="bg-white w-full max-w-md p-6 mb-3 rounded-lg shadow-lg flex flex-col items-center relative">
          <img
            src={
              imagePreview
                ? imagePreview
                : profile?.profilePic ?? "https://picsum.photos/200"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <label
            htmlFor="profile-image"
            className="absolute bottom-0 right-0 bg-white text-blue-500 rounded-full cursor-pointer border-4 border-white px-2 py-1"
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

        <div className="bg-white w-3/4 p-6 mb-3 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
            />
          </div>
          {nameError && <p className="text-red-500">{nameError}</p>}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              value={formData?.email ?? ""}
              name="email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-semibold"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              value={formData?.phone ?? ""}
              name="phone"
              onChange={handleInputChange}
            />
          </div>
          {phoneError && <p className="text-red-500">{phoneError}</p>}

          {/* Update Profile Button */}
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
