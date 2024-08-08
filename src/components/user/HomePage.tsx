import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import useHotelDetails from "../../hooks/user/useHotelDetails";
import useUserHotels from "../../hooks/user/useUserHotel";

interface HotelDataProps {
  _id: string;
  imageUrls: string[];
  name: string;
  place: string;
  stayType: string;
  price?: number; 
}

const HotelData: React.FC<HotelDataProps> = ({ _id, imageUrls, name, place, stayType }) => {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const { hotel, loading, error } = useHotelDetails(_id);

  const handleClick = () => {
    navigate(`/user/hotelDetails/${_id}`);
  };

  const toggleShowMore = () => {
    setShowMore(prev => !prev);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white border border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden w-full max-w-xs"
    >
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={imageUrls[0]}
        alt={name}
      />
      <div className="p-4">
        <h5 className="text-2xl font-bold text-gray-900 mb-1">{name}</h5>
        <p className="text-lg font-semibold text-gray-700 mb-2">{place}</p>
        <p className="text-md font-medium text-gray-600">{stayType}</p>
        <div className="mt-4">
          <p className="font-semibold text-gray-900">Amenities:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {loading ? (
              <li>Loading amenities...</li>
            ) : error ? (
              <li>Error loading amenities</li>
            ) : hotel?.amenities?.length > 0 ? (
              <>
                {hotel.amenities.slice(0, showMore ? undefined : 3).map((amenity:any, index:any) => (
                  <li key={index} className="text-sm">{amenity}</li>
                ))}
                {hotel.amenities.length > 3 && (
                  <button
                    onClick={toggleShowMore}
                    className="text-blue-500 mt-2"
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                )}
              </>
            ) : (
              <li>No amenities available</li>
            )}
          </ul>
          <div className="mt-4 p-4 border border-gray-300 rounded-lg text-center">
          <div className="flex flex-col items-center">
            <button className="bg-gradient-to-r from-orange-500 to-blue-400 text-white py-1 px-4 rounded-full"> Check prices</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { hotels } = useUserHotels();
  const [currentPage, setCurrentPage] = useState(0);
  const hotelsPerPage = 4; // Number of hotels per page

  // Filter only approved and non-blocked hotels
  const approvedAndNonBlockedHotels = hotels.filter(hotel => hotel.isApproved && !hotel.isBlocked);

  const totalPages = Math.ceil(approvedAndNonBlockedHotels.length / hotelsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  };

  // Get hotels for the current page
  const startIndex = currentPage * hotelsPerPage;
  const currentHotels = approvedAndNonBlockedHotels.slice(startIndex, startIndex + hotelsPerPage);

  return (
    <div className="py-10 px-4 md:px-8 lg:px-12">
      <div
        className={`grid gap-6 ${
          approvedAndNonBlockedHotels.length === 1
            ? 'place-items-center'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
       {currentHotels.length > 0 ? (
  currentHotels.map((hotel) => (
    <HotelData
      key={hotel._id.toString()} // Convert ObjectId to string for the key
      {...{
        _id: hotel._id.toString(), // Convert ObjectId to string
        imageUrls: hotel.imageUrls,
        name: hotel.name,
        place: hotel.place,
        stayType: hotel.stayType,
      }}
    />
  ))
) : (
  <p className="text-center text-gray-500">No approved hotels available</p>
)}

      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            className="p-2 text-gray-600 hover:text-gray-800"
            disabled={currentPage === 0}
          >
            <FaChevronLeft size={24} />
          </button>
          <span className="text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="p-2 text-gray-600 hover:text-gray-800"
            disabled={currentPage === totalPages - 1}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
