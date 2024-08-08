import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import useHotelDetails from "../../hooks/user/useHotelDetails";

const STEP = 100;
const MIN = 500;
const MAX = 20000;

interface HotelDataProps {
  _id: string;
  imageUrls: string[];
  name: string;
  place: string;
  stayType: string;
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
      className="cursor-pointer bg-white border border-blue-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden w-full"
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
              <button className="bg-gradient-to-r from-orange-500 to-blue-400 text-white py-1 px-4 rounded-full">Check prices</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HotelCards: React.FC = () => {

  const searchResults = useSelector((state: RootState) => state.destinationSlice.search);
  const [values, setValues] = useState([MIN, MAX]);

  return (
    <div className="grid grid-cols-12 mt-2 min-h-screen">
      <div className="w-full bg-white col-span-12 lg:col-span-3 flex flex-col gap-5 px-2">
        <div className="flex-1 bg-gray-100 p-3 rounded-md sticky top-20 h-fit">
          <h1 className="text-lg text-gray-700 mb-2 font-bold">Filter by:</h1>
          <div className="mb-4 border p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-700">Categories</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Resorts</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Villas</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Apartments</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Hotels</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mb-4 border p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-700">Your budget (per night)</h2>
            <div className="py-4">
              <Range
                step={STEP}
                min={MIN}
                max={MAX}
                values={values}
                onChange={values => setValues(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="w-full h-1 bg-gray-300 rounded-lg">
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="w-5 h-5 bg-blue-600 rounded-full" />
                )}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>₹ {values[0]}</span>
              <span>₹ {values[1]}+</span>
            </div>
          </div>
          <div className="mb-4 border p-4 rounded-lg">
            <h2 className="text-sm font-medium text-gray-700">Rating</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Superb: 9+</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Less than 1 km</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Villas</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Resorts</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">4 stars</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Balcony</span>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                  <span className="ml-2 text-gray-700">Private pool</span>
                </label>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              /* handle search logic */
            }}
            className="py-2 bg-blue-700 rounded-lg text-white w-full font-medium cursor-pointer"
          >
            Apply filters .0
          </button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-9 bg-gray-100 p-5">
        {searchResults.length > 0 ? (
          <div className="flex flex-col gap-4">
            {searchResults.map((hotel :any)=> (
              <HotelData
                key={hotel._id.toString()}
                _id={hotel._id.toString()}
                imageUrls={hotel.imageUrls}
                name={hotel.name}
                place={hotel.place}
                stayType={hotel.stayType}
              />
            ))}
          </div>
        ) : (
          <p>No hotels available</p>
        )}
      </div>
    </div>
  );
};

export default HotelCards;
