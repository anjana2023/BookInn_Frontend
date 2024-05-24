import React, { useState } from "react";
import useHotelList from "../../hooks/owner/UseHotelList";
import { Button } from "flowbite-react";
import { HotelInterface } from "../../types/hotelInterface";
import { useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";
import axiosJWT from "../../utils/axiosService";
import { OWNER_API } from "../../constants";

interface HotelDataProps {
  _id: string;
  image: string;
  name: string;
  place: string;
  isBlocked: boolean;
  status: string;
  handleClick: (id: string) => void;
}

const HotelData: React.FC<HotelDataProps> = ({ _id, image, name, place, isBlocked, status, handleClick }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosJWT
      .patch(OWNER_API + `/block_hotel/${_id}`)
      .catch((err) => console.log(err));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex items-center p-6 bg-white border border-gray-600 rounded-lg shadow-lg my-3 max-w-3xl mx-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        className="w-20 h-20 object-cover rounded-full mr-4"
        src={image}
        alt={name}
      />
      <div className="flex-grow">
        <h5 className="text-xl font-semibold text-gray-800">{name}</h5>
        <p className="text-gray-600">{place}</p>
        <p className={`text-lg font-medium ${getStatusColor(status)}`}>{status}</p>
      </div>
      <div className="flex-grow flex flex-col items-center">
        <button
          onClick={handleCheckboxChange}
          className={`px-3 py-1 rounded-md focus:outline-none ${
            isChecked ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          } text-white transition-colors duration-300`}
        >
          {isChecked ? "Blocked" : "Block"}
        </button>
      </div>
      <div className="ml-auto">
        <Button onClick={() => handleClick(_id)} outline gradientDuoTone="purpleToBlue">
          <FaEdit className="w-5 h-5 mr-2" /> View/Edit
        </Button>
      </div>
    </div>
  );
};

const Hotels: React.FC = () => {
  const { hotels, error } = useHotelList();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/owner/hotelDetails/${id}`);
  };

  if (error) {
    return <p className="text-red-600 text-center my-4">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <HotelData
            key={hotel._id}
            _id={hotel._id}
            image={hotel.image}
            name={hotel.name}
            place={hotel.place}
            isBlocked={hotel.isBlocked}
            status={hotel.status}
            handleClick={handleClick}
          />
        ))
      ) : (
        <p className="text-gray-600 text-center my-4">No hotels available</p>
      )}
    </div>
  );
};

export default Hotels;
