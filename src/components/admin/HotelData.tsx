import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import useHotelList from '../../hooks/admin/useHotels';
import { HotelInterface } from '../../types/hotelInterface';

interface HotelDataProps {
  _id: string;
  image: string;
  name: string;
  place: string;
  status: string; // include status in props
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
        <p className="text-gray-900">{status}</p>
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
  const approvedHotels = hotels.filter(hotel => hotel.isApproved);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen px-14 py-7">
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">Image</th>
              <th scope="col" className="p-4 text-center">Name</th>
              <th scope="col" className="p-4 text-center">Status</th> {/* New Status Column */}
              <th scope="col" className="p-4 text-center">Actions</th>
              <th scope="col" className="p-4 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {approvedHotels.length > 0 ? (
              approvedHotels.map((hotel: HotelInterface) => (
                <HotelData
                  key={hotel._id}
                  _id={hotel._id}
                  image={hotel.image}
                  name={hotel.name}
                  place={hotel.place}
                  status={hotel.status} // pass status prop
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
      </div>
    </div>
  );
};

export default Hotels;
