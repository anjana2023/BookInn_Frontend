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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center relative mb-6">
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
            className="absolute bottom-0 right-0 bg-white text-blue-500 rounded-full cursor-pointer border-4 border-white px-2 py-1 shadow-md flex items-center space-x-1"
          >
            <i className="fas fa-camera"></i>
            <span>Change</span>
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

        {/* Profile Form Section */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
            />
            {nameError && <p className="text-red-500 mt-1 text-sm">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 cursor-not-allowed"
              value={formData?.email ?? ""}
              name="email"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-semibold"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="border text-gray-700 border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData?.phone ?? ""}
              name="phone"
              onChange={handleInputChange}
            />
            {phoneError && <p className="text-red-500 mt-1 text-sm">{phoneError}</p>}
          </div>

          {/* Update Profile Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
