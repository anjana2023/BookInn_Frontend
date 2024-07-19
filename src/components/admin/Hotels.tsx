import React, { useState } from "react";
import useHotelList from "../../hooks/admin/useHotels";
import { Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { HotelInterface } from "../../types/hotelInterface";
import ReactPaginate from "react-paginate";
import axiosJWT from "../../utils/axiosService";
import { OWNER_API } from "../../constants";
import toast from "react-hot-toast";

interface HotelDataProps {
  _id: string;
  image: string;
  name: string;
  place: string;
  status: string;
  isBlocked: boolean; // Include isBlocked in props
}

const HotelData: React.FC<HotelDataProps> = ({ _id, image, name, place, status, isBlocked }) => {
  const navigate = useNavigate();
  // const [showConfirm, setShowConfirm] = useState<boolean>(false);
  // const [isChecked, setIsChecked] = useState<boolean>(isBlocked);

  const handleClick = () => {
    navigate(`/admin/hotelDetails/${_id}`);
  };

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  //   axiosJWT
  //     .patch(OWNER_API + `/block_hotel/${_id}`)
  //     .then(() => {
  //       toast.success(`Hotel ${!isChecked ? "blocked" : "unblocked"} successfully!`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("An error occurred. Please try again.");
  //     });
  //   setShowConfirm(false);
  // };

  // const toggleConfirmDialog = () => {
  //   setShowConfirm(!showConfirm);
  // };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="p-4">
        <img className="w-24 h-24 object-cover rounded" src={image} alt={name} />
      </td>
      <td className="p-4 text-center">
        <h5 className="text-xl font-bold text-gray-900">{name}</h5>
      </td>
      <td className="p-4 text-center">
        <p className="text-red-600 text-bold  ">{status}</p>
      </td>
      <td className="px-6 py-4 text-left">
        <Link
          to={`/admin/hotels/${_id}/verification`}
          className="bg-green-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-10"
        >
          Verify
        </Link>
      </td>
      <td className="p-4 text-center">
        <Button onClick={handleClick} outline gradientDuoTone="purpleToBlue">
          View Details
        </Button>
      </td>
      {/* <td className="p-4 text-center">
        <button
          onClick={toggleConfirmDialog}
          className={`px-3 py-1 rounded-md focus:outline-none ${
            isChecked
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } text-white transition-colors duration-300`}
        >
          {isChecked ? "Unblock" : "Block"}
        </button>
      </td> */}
      {/* {showConfirm && (
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
      )} */}
    </tr>
  );
};

const Hotels: React.FC = () => {
  const { hotels, error } = useHotelList();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Filter unapproved and not blocked hotels
  const unapprovedAndNotBlockedHotels = hotels.filter((hotel) => hotel.status !== "approved" && !hotel.isBlocked);

  if (error) {
    return <p>{error}</p>;
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const pageCount = Math.ceil(unapprovedAndNotBlockedHotels.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentItems = unapprovedAndNotBlockedHotels.slice(offset, offset + itemsPerPage);

  return (
    <div className=" flex h-screen overflow-hidden flex flex-col">
      <div className="flex-grow px-14 py-7">
        {unapprovedAndNotBlockedHotels.length > 0 ? (
          <>
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">Image</th>
                    <th scope="col" className="p-4 text-center">Name</th>
                    <th scope="col" className="p-4 text-center">Status</th>
                    <th scope="col" className="p-4 text-center">Actions</th>
                 
                    {/* <th scope="col" className="p-4 text-center">Block/Unblock</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((hotel: HotelInterface) => (
                    <HotelData
                      key={hotel._id}
                      _id={hotel._id}
                      image={hotel.imageUrls[2]}
                      name={hotel.name}
                      place={hotel.place}
                      status={hotel.status}
                      // isBlocked={hotel.isBlocked} 
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h1 className="text-center text-bold text-xl item-center">No Requested hotels available</h1>
        )}
      </div>
      <div className="py-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center items-center space-x-2"}
          pageClassName={"px-3 py-1 border border-gray-300 text-gray-700 cursor-pointer"}
          activeClassName={"bg-gray-400 text-white"}
          previousClassName={"px-3 py-1 border border-gray-300 cursor-pointer"}
          nextClassName={"px-3 py-1 border border-gray-300 cursor-pointer"}
          disabledClassName={"cursor-not-allowed opacity-50"}
        />
      </div>
    </div>
  );
};

export default Hotels;
