import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import useHotelList from '../../hooks/admin/useHotels';
import { HotelInterface } from '../../types/hotelInterface';
import ReactPaginate from 'react-paginate';
import axiosJWT from '../../utils/axiosService';
import toast from 'react-hot-toast';
import { OWNER_API } from '../../constants';

interface HotelDataProps {
  _id: string;
  image: string;
  name: string;
  place: string;
  status: string;
  isBlocked: boolean;
}

const HotelData: React.FC<HotelDataProps> = ({ image, name, _id, status, isBlocked }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked);

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

  const handleClick = () => {
    navigate(`/admin/hotelDetails/${_id}`);
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td className="p-4">
          <img className="w-24 h-24 object-cover rounded" src={image} alt={name} />
        </td>
        <td className="p-4 text-center">
          <h5 className="text-xl font-bold text-gray-900">{name}</h5>
        </td>
        <td className="p-4 text-center">
          <p className="text-gray-900 text-bold ">{status}</p>
        </td>
        <td className="px-6 py-4 text-left">
          <button
            onClick={toggleConfirmDialog}
            className={`px-4 py-2 rounded-md focus:outline-none ${
              isChecked ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isChecked ? "Blocked" : "Block"}
          </button>
        </td>
        <td className="p-4 text-center">
          <Button onClick={handleClick} outline gradientDuoTone="purpleToBlue">
            View Details
          </Button>
        </td>
      </tr>
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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const approvedHotels = hotels.filter((hotel) => hotel.status === 'approved' && !hotel.isBlocked);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const currentHotels = approvedHotels.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="h-screen w-full px-14 py-7 overflow-hidden">
      <h1 className="text-2xl font-bold text-center mb-4 pb-3">Verified Hotels</h1>
      <div className="h-full overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">Image</th>
              <th scope="col" className="p-4 text-center">Name</th>
              <th scope="col" className="p-4 text-center">Status</th>
              <th scope="col" className="p-4 text-center">Block/Unblock</th>
              <th scope="col" className="p-4 text-center">View Details</th>
            </tr>
          </thead>
          <tbody>
            {currentHotels.length > 0 ? (
              currentHotels.map((hotel: HotelInterface) => (
                <HotelData
                  key={hotel._id.toString()}
                  _id={hotel._id.toString()}
                  image={hotel.imageUrls[1]}
                  name={hotel.name}
                  place={hotel.place}
                  status={hotel.status}
                  isBlocked={hotel.isBlocked}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">No approved hotels available.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="py-4 flex justify-center items-center">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(approvedHotels.length / itemsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-center items-center space-x-2'}
            pageClassName={'px-3 py-1 border border-gray-300 text-gray-700 cursor-pointer'}
            activeClassName={'bg-gray-400 text-white'}
            previousClassName={'px-3 py-1 border border-gray-300 cursor-pointer'}
            nextClassName={'px-3 py-1 border border-gray-300 cursor-pointer'}
            disabledClassName={'cursor-not-allowed opacity-50'}
          />
        </div>
      </div>
    </div>
  );
};

export default Hotels;
