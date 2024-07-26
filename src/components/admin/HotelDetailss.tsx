import React from "react";
import useHotelDetails from "../../hooks/admin/useHotelDetails";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
// import { setData } from "../../redux/slices/bookingslice"

const HotelDetail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];

  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Error: No hotel ID provided.</p>;
  }

  const { hotel, loading, error } = useHotelDetails(id);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading hotel details.</p>;
  if (!hotel) return <p>No hotel details available.</p>;

  const {
    name,
    imageUrls,
    place,
    description,
    amenities,
    status,
    room,
    guests: maxGuests,
    stayType,
    address,
    unavailbleDates: unavailableDatesRaw,
    hotelDocument,
  } = hotel;

  // Convert unavailable dates to ISO format, if they exist
  const unavailableDates =
    unavailableDatesRaw?.map(
      (date) => new Date(date).toISOString().split("T")[0]
    ) || [];

    const isImage = (url: string) => {
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    };


  return (

    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Images at the top */}
      <div className="mb-6 h-2/5">
        <div className="grid grid-cols-2 gap-2">
          <img
            src={imageUrls[0]}
            alt="Houseboat"
            className="h-full object-cover rounded-lg mb-2 col-span-1"
          />
          <div className="grid grid-cols-2 gap-2">
            {imageUrls.slice(1, 5).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Houseboat ${index + 1}`}
                className="h-full object-cover rounded-lg col-span-1"
              />
            ))}
          </div>
          <h1 className="text-2xl col-span-2 p-3 font-bold">Hotel Documents</h1>
          {hotelDocument && (
            <div className="mb-6">
              <div className="mb-4">
                {isImage(hotelDocument) ? (
                  <img
                    src={hotelDocument}
                    alt="Hotel Document"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ) : (
                  <iframe
                    src={hotelDocument}
                    title="Hotel Document"
                    className="w-full h-96 border rounded-lg"
                  />
                )}
                <a
                  href={hotelDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  View/Download Hotel Document
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details below */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-700 mb-2">{room} room.</p>
          <p className="text-gray-600 mb-2">{place}</p>
          <div className="flex items-center mb-2">
            <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold mr-2">
              4.97
            </span>
            <span className="text-gray-600">(79 reviews)</span>
          </div>
          <div className="mb-4">
            <p className="text-gray-800 mb-1">Hosted by Kirby</p>
            <p className="text-gray-600 mb-1">Dedicated workspace</p>
            <p className="text-gray-600 mb-1">Kirby is a Superhost</p>
            <p className="text-gray-600 mb-1">Free cancellation before Jun 3</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              What this place offers
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default HotelDetail;
