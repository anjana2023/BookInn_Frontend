import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import useHotel from "../../hooks/owner/useHotel";

const AddHotelForm = () => {
  const {
    formData,
    handleChange,
    handleAddMore,
    handleSubmit,
    handleRoomEnabledChange,
    emailError,
    placeError,
    descriptionError,
    selectedDescription,
    handleDescriptionChange,
    aboutPropertyError,
    predefinedAmenities,
    handleAddAmenity,
    imagePreview,
    roomTypes,
  } = useHotel();

  const descriptionOptions = [
    { value: "2-star Hotel" },
    { value: "3-star Hotel" },
    { value: "4-star Hotel" },
    { value: "5-star Hotel" },
  ];

  return (
    <div className="p-10 bg-white min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Add Hotel
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4 ">
            <div className="flex-1 space-y-6 ">
              <div className="flex flex-col">
                <label className="text-orange-500 text-lg font-bold">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-white border-2 border-gray-800 rounded py-2 px-4 text-black focus:outline-none focus:border-orange-500"
                  placeholder="Name"
                  value={formData.name}
                  onChange={e => handleChange(e, null, "name")}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-orange-500 text-lg font-bold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-white border-2 border-gray-600 rounded py-2 px-4 text-black focus:outline-none focus:border-orange-500"
                  placeholder="Email"
                  value={formData.email}
                  onChange={e => handleChange(e, null, "email")}
                  required
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div className="flex flex-col">
                <label className="text-orange-500 text-lg font-bold">
                  Place:
                </label>
                <input
                  type="text"
                  name="place"
                  className="bg-white border-2 border-gray-600 rounded py-2 px-4 text-black focus:outline-none focus:border-orange-500"
                  placeholder="Place"
                  value={formData.place}
                  onChange={e => handleChange(e, null, "place")}
                  required
                />
              </div>
              {placeError && (
                <p className="text-red-500 text-center">{placeError}</p>
              )}
              <div className="flex flex-col">
                <label className="text-orange-500 text-lg font-bold">
                  Description:
                </label>
                <select
                  className="bg-white border-2 border-gray-600 rounded py-2 px-4 text-black focus:outline-none focus:border-orange-500"
                  value={selectedDescription}
                  onChange={handleDescriptionChange}
                >
                  <option value="">Select Description</option>
                  {descriptionOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-orange-500 text-lg font-bold">
                  About Property:
                </label>
                <textarea
                  className="bg-white border-2 border-gray-600 rounded py-2 px-4 text-black focus:outline-none focus:border-orange-500"
                  placeholder="About Property"
                  name="aboutProperty"
                  value={formData.aboutProperty}
                  onChange={e => handleChange(e, null, "aboutProperty")}
                  required
                />
              </div>
              {aboutPropertyError && (
                <p className="text-red-500 text-center">{aboutPropertyError}</p>
              )}
            </div>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={imagePreview ? imagePreview : "https://picsum.photos/200"}
                alt="Profile"
                className="rounded-2xl w-48 border-2 border-orange-500"
              />
              <input
                type="file"
                id="profile-image"
                name="imageFile"
                className="hidden"
                onChange={e => handleChange(e, null, "image")}
              />
              <label
                htmlFor="profile-image"
                className="cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 text-black font-bold py-2 px-4 rounded-lg"
              >
                Upload Image
              </label>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <label className="text-orange-500 text-lg font-bold">
              Property Rules:
            </label>
            <div className="space-y-2">
              {formData.propertyRules.map((rule, index) => (
                <input
                  key={index}
                  type="text"
                  className="bg-white border-2 border-gray-600 rounded py-2 px-4 text-black focus:outline-none focus:border-orange-500 w-2/3"
                  placeholder={`Property rule ${index + 1}`}
                  value={rule}
                  onChange={e => handleChange(e, index, "propertyRules")}
                  required
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddMore("propertyRules")}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add More
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <label className="text-orange-500 text-lg font-bold">
              Amenities:
            </label>
            <div className="flex flex-wrap gap-2">
              {predefinedAmenities.map((amenity, index) => (
                <label key={index} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-orange-500"
                    value={amenity}
                    onChange={() => handleAddAmenity(amenity)}
                  />
                  <span className="ml-2 text-gray-200">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-orange-500">Room Types</h2>
            {roomTypes.map((roomType, index) => (
              <div key={roomType.name} className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={roomType.enabled}
                    onChange={() => handleRoomEnabledChange(roomType.name)}
                    className="bg-white form-checkbox h-5 w-5 text-orange-500"
                  />
                  <p className="text-lg font-bold text-gray-200">
                    {roomType.name}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex flex-col space-y-2">
                    <label className="bg-whitetext-sm font-medium text-gray-200">
                      Price per Night:
                    </label>
                    <input
                      type="number"
                      name={`rooms_${index}_price`}
                      className="bg-white border-2 border-gray-600 rounded py-1 px-2 text-black focus:outline-none focus:border-orange-500"
                      placeholder="Price"
                      value={formData.rooms[index]?.price || ""}
                      onChange={e => handleChange(e, index, "rooms_price")}
                      disabled={!roomType.enabled}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium text-gray-200">
                      Count:
                    </label>
                    <input
                      type="number"
                      name={`rooms_${index}_number`}
                      className="bg-white border-2 border-gray-600 rounded py-1 px-2 text-black focus:outline-none focus:border-orange-500"
                      placeholder="Count"
                      value={formData.rooms[index]?.number || ""}
                      onChange={e => handleChange(e, index, "rooms_number")}
                      disabled={!roomType.enabled}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotelForm;
