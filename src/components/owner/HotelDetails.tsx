import React, { useEffect } from "react";
import useHotelDetails from "../../hooks/user/useHotelDetails";
import useHotel from "../../hooks/owner/useHotelDetail";
import { useParams } from "react-router-dom";
import { Button } from "flowbite-react";

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Error: No hotel ID provided.</p>;
  }

  const { hotel, loading, error } = useHotelDetails(id);
  const {
    formData,
    handleChange,
    handleAddMore,
    handleSubmit,
    handleRoomEnabledChange,
    handleDescriptionChange,
    emailError,
    placeError,
    descriptionError,
    aboutPropertyError,
    handleAddAmenity,
    predefinedAmenities,
    imagePreview,
    roomTypes,
    selectedDescription,
    setFormData,
  } = useHotel();

  useEffect(() => {
    if (hotel) {
      setFormData({
        _id: hotel._id,
        name: hotel.name,
        email: "", // Assuming email is not available in hotel data
        place: hotel.place,
        description: hotel.description,
        propertyRules: hotel.propertyRules || [""],
        aboutProperty: hotel.aboutProperty || "",
        rooms: hotel.rooms.map((room) => ({
          type: room.roomType,
          price: room.price,
          number: room.number,
        })) || [],
        amenities: hotel.amenities || [],
        imageFile: [] // Assuming image files are not available in hotel data
      });
    }
  }, [hotel, setFormData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading hotel details.</p>;
  if (!hotel) return <p>No hotel details available.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-gray-200 rounded-lg shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="md:col-span-1 flex flex-col justify-center bg-gray-50 p-4 rounded-lg">
            <label className="text-xl font-semibold text-gray-600 mt-4" htmlFor="place">ID</label>
            <input
              id="place"
              name="place"
              type="text"
              onChange={(e) => handleChange(e, null, "place")}
              value={formData._id}
              className="mt-2 p-2 border rounded-lg w-full"
            />
            <label className="text-xl font-semibold text-gray-600" htmlFor="name">Hotel Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={(e) => handleChange(e, null, "name")}
              value={formData.name}
              className="mt-2 p-2 border rounded-lg w-full"
            />
            <label className="text-xl font-semibold text-gray-600 mt-4" htmlFor="place">Place</label>
            <input
              id="place"
              name="place"
              type="text"
              onChange={(e) => handleChange(e, null, "place")}
              value={formData.place}
              className="mt-2 p-2 border rounded-lg w-full"
            />
            <label className="text-xl font-semibold text-gray-600 mt-4" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => handleChange(e, null, "description")}
              value={formData.description}
              className="mt-2 p-2 border rounded-lg w-full"
            />
            <label className="text-xl font-semibold text-gray-600 mt-4" htmlFor="aboutProperty">About the Property</label>
            <textarea
              id="aboutProperty"
              name="aboutProperty"
              onChange={(e) => handleChange(e, null, "aboutProperty")}
              value={formData.aboutProperty}
              className="mt-2 p-2 border rounded-lg w-full"
            />
          </div>
          <div className="md:col-span-1 flex flex-col justify-center bg-gray-100 p-4 rounded-lg">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src={imagePreview || hotel.image}
              alt={formData.name}
            />
            <label
              htmlFor="image"
              className="mt-4 bg-white text-blue-500 rounded-full cursor-pointer border-4 border-white px-2 py-1"
            >
              Change Pic
              <input
                type="file"
                id="image"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleChange(e, null, "image")}
              />
            </label>
          </div>
          <div className="md:col-span-1 p-6 bg-gray-50">
            <label className="text-xl font-semibold text-gray-600" htmlFor="propertyRules">Property Rules</label>
            {formData.propertyRules.map((rule, index) => (
              <textarea
                key={index}
                id={`propertyRule_${index}`}
                name="propertyRules"
                onChange={(e) => handleChange(e, index, "propertyRules")}
                value={rule}
                className="mt-2 p-2 border rounded-lg w-full"
              />
            ))}
            <Button onClick={() => handleAddMore("propertyRules")} className="mt-2">Add More Rules</Button>
          </div>
          <div className="md:col-span-1 p-6 bg-gray-50">
            <label className="text-xl font-semibold text-gray-600" htmlFor="amenities">Amenities</label>
            {predefinedAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity_${index}`}
                  name="amenities"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAddAmenity(amenity)}
                  className="mr-2"
                />
                <label htmlFor={`amenity_${index}`} className="text-gray-700">{amenity}</label>
              </div>
            ))}
          </div>
          <div className="md:col-span-1 p-6 bg-gray-50">
            <label className="text-xl font-semibold text-gray-600" htmlFor="rooms">Rooms</label>
            {roomTypes.map((roomType, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`roomType_${index}`}
                  name="rooms"
                  checked={roomType.enabled}
                  onChange={() => handleRoomEnabledChange(roomType.name)}
                  className="mr-2"
                />
                <label htmlFor={`roomType_${index}`} className="text-gray-700">{roomType.name}</label>
              </div>
            ))}
            {formData.rooms.map((room, index) => (
              <div key={index} className="mt-4">
                <h4 className="text-lg font-bold text-gray-900">{room.type}</h4>
                <label className="text-gray-700">Price: </label>
                <input
                  type="text"
                  value={room.price}
                  onChange={(e) => handleChange(e, index, `rooms_price`)}
                  className="p-2 border rounded-lg w-full mt-1"
                />
                <label className="text-gray-700">Number: </label>
                <input
                  type="text"
                  value={room.number}
                  onChange={(e) => handleChange(e, index, `rooms_number`)}
                  className="p-2 border rounded-lg w-full mt-1"
                />
              </div>
            ))}
          </div>
          <div className="md:col-span-2 p-6 flex justify-end bg-gray-50">
            <Button type="submit" gradientDuoTone="purpleToBlue">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelDetail;
