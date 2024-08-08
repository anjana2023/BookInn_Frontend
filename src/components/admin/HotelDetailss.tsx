import React from "react";
import useHotelDetails from "../../hooks/admin/useHotelDetails";
import {  useParams } from "react-router-dom";



const HotelDetail: React.FC = () => {

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
   
    hotelDocument,
  } = hotel;

  // Convert unavailable dates to ISO format, if they exist

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
          <div className="mb-4 col-span-2">
        <h3 className="text-xl font-semibold text-gray-800 py-2">
          Room Details
        </h3>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-4">Room</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">max Adults</th>
              <th className="text-left py-3 px-4">max Children</th>
              <th className="text-left py-3 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {hotel?.rooms.map(room => (
              <tr className="border-b">
                <td className="py-3 px-4">{room.title}</td>
                <td className="py-3 px-4">{room.desc}</td>
                <td className="py-3 px-4">{room.maxAdults}</td>
                <td className="py-3 px-4">{room.maxChildren}</td>
                <td className="py-3 px-4">{room.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
