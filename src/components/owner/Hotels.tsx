
import React, { useState } from "react";
import useHotelList from "../../hooks/owner/UseHotelList";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router";
import axiosJWT from "../../utils/axiosService";
import { OWNER_API } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaRedo } from "react-icons/fa";

interface HotelDataProps {
  _id: string;
  image: string;
  name: string;
  place: string;
  isBlocked: boolean;
  status: string;
  rejectedReason?: string;
  handleClick: (id: string) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
        }`}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

// HotelData Component
const HotelData: React.FC<HotelDataProps> = ({
  _id,
  image,
  name,
  place,
  isBlocked,
  status,
  rejectedReason,
  handleClick,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosJWT
      .patch(OWNER_API + `/block_hotel/${_id}`)
      .then(() => {
        toast.success(`Hotel ${!isChecked ? "blocked" : "unblocked"} successfully!`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again.");
      });
    setShowConfirm(false);
  };

  const toggleConfirmDialog = () => {
    setShowConfirm(!showConfirm);
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
    <>
      <div className="flex items-center p-6 bg-white border border-gray-600 rounded-lg shadow-lg my-3 max-w-3xl mx-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <img
          className="w-24 h-24 object-cover rounded-full mr-6"
          src={image}
          alt={name}
        />
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h5 className="text-2xl font-semibold text-gray-800">{name}</h5>
            <p className="text-gray-600 text-lg">{place}</p>
            <p className={`text-lg font-medium mt-1 ${getStatusColor(status)}`}>
              {status}
            </p>
            {status === "rejected" && rejectedReason && (
              <p className="text-red-600 font-semibold mt-2">Reason: {rejectedReason}</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={toggleConfirmDialog}
              className={`px-4 py-2 rounded-md focus:outline-none ${
                isChecked
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white transition-colors duration-300`}
            >
              {isChecked ? "Blocked" : "Block"}
            </button>
            <Button
              onClick={() => handleClick(_id)}
              outline
              gradientDuoTone={status === "rejected" ? "redToPink" : "purpleToBlue"}
              className={`text-white ${status === "rejected" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} transition-colors duration-300`}
            >
              {status === "rejected" ? <><FaRedo className="w-5 h-5 mr-2" /> Reapply</> : <><FaEdit className="w-5 h-5 mr-2" /> View/Edit</>}
            </Button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="Toastify__toast-container--center"
        />
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-md shadow-md z-50">
            <h1 className="text-xl font-bold mb-4">Confirm Action</h1>
            <p className="mb-4">Are you sure you want to {isChecked ? "unblock" : "block"} this hotel?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCheckboxChange}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Yes
              </button>
              <button
                onClick={toggleConfirmDialog}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const Hotels: React.FC = () => {
  const { hotels, error } = useHotelList();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(4); 

  
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClick = (id: string) => {
    navigate(`/owner/editHotel/${id}`);
  };

  if (error) {
    return <p className="text-red-600 text-center my-4">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Your Hotels</h1>
      {currentHotels.length > 0 ? (
        currentHotels.map((hotel) => (
          <HotelData
            key={hotel._id.toString()}
            _id={hotel._id.toString()}
            image={hotel.imageUrls[0]}
            name={hotel.name}
            place={hotel.place}
            isBlocked={hotel.isBlocked}
            status={hotel.status}
            rejectedReason={hotel.rejectedReason}
            handleClick={handleClick}
          />
        ))
      ) : (
        <p className="text-gray-600 text-center my-4">No hotels available</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Hotels;
