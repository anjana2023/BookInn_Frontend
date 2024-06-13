import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import useHotelList from '../../hooks/admin/useHotels';
import { HotelInterface } from '../../types/hotelInterface';
import ReactPaginate from 'react-paginate';

interface HotelDataProps {
  _id: string;
  image: string;
  name: string;
  place: string;
  status: string;
}

const HotelData: React.FC<HotelDataProps> = ({ image, name, place, _id, status }) => {
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
        <p className="text-gray-900 text-bold ">{status}</p>
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
  const approvedandNonBlockedHotels = hotels.filter((hotel) => hotel.isApproved&&!hotel.isBlocked);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(approvedandNonBlockedHotels.length / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const currentHotels = approvedandNonBlockedHotels.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="h-screen w-full px-14 py-7 overflow-hidden">
     <h1 className='text-2xl font-bold text-center mb-4 pb-3'>Verifed Hotels</h1>
      <div className="h-full overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Image
              </th>
              <th scope="col" className="p-4 text-center">
                Name
              </th>
              <th scope="col" className="p-4 text-center">
                Status
              </th>
              <th scope="col" className="p-4 text-center">
                Actions
              </th>
              <th scope="col" className="p-4 text-center">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {currentHotels.length > 0 ? (
              currentHotels.map((hotel: HotelInterface) => (
                <HotelData
                  key={hotel._id}
                  _id={hotel._id}
                  image={hotel.imageUrls[1]}
                  name={hotel.name}
                  place={hotel.place}
                  status={hotel.status}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  No approved hotels available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="py-4 flex justify-center items-center">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
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
