import React, { useState } from "react";
import useHotelList from "../../hooks/admin/useHotels";
import { Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { HotelInterface } from "../../types/hotelInterface";
import ReactPaginate from "react-paginate";

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
  const handleClick = () => {
    navigate(`/admin/hotelDetails/${_id}`);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="p-4">
        <img className="w-24 h-24 object-cover rounded" src={image} alt={name} />
      </td>
      <td className="p-4 text-center">
        <h5 className="text-xl font-bold text-gray-900">{name}</h5>
      </td>
      <td className="p-4 text-center">
        <p className="text-gray-900 text-bold  ">{status}</p>
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
                    <th scope="col" className="p-4 text-center">Details</th>
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
                      isBlocked={hotel.isBlocked} // pass isBlocked prop
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
