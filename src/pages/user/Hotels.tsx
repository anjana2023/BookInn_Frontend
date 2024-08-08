import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";

import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";

import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { setData } from "../../redux/slices/searchingSlice";
import useHotelsUser from "../../hooks/user/useHotel";
import SearchBoxUser from "../../components/user/searchBox";


const MIN = 0;
const MAX = 100000;

const Hotels: React.FC = () => {
  const searchData = useAppSelector((state) => state.searchingSlice);
  const { handleSearch, loading } = useHotelsUser();
  const dispatch = useAppDispatch();
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/user/hotelDetails/${id}`);
  };
  const searchResults = useSelector(
    (state: RootState) => state.destinationSlice.search
  );

  useEffect(() => {
    if (!loading) {
      setLocalLoading(false);
    }
  }, [loading]);

  const [active, setActive] = useState(1);
  const resultsPerPage = 10; 
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  type optionType = {
    adult: number;
    children: number;
    room: number;
  };

  type datesType = {
    startDate: Date;
    endDate: Date;
  };

  const handleSearchFunction = async (
    place: string,
    options: optionType,
    dates: datesType
  ) => {
    const { startDate, endDate } = dates;
    const searchData = {
      place,
      dates: [{ startDate, endDate }],
      options,
    };
    setLocalLoading(true);
    await dispatch(setData(searchData));
  };

  useEffect(() => {
    if (localLoading) {
      handleSearch();
    }
  }, [searchData, localLoading]);

  useEffect(() => {
    if (searchResults.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [searchResults]);

  const paginatedResults = searchResults.slice(
    (active - 1) * resultsPerPage,
    active * resultsPerPage
  );

  return (
    <div className="md:px-40 lg:px-60 pt-8">
      <SearchBoxUser handleSearch={handleSearchFunction} />
      <div className="grid grid-cols-12 mt-2 min-h-screen">
        <div className="w-full bg-white col-span-12 lg:col-span-3 flex flex-col gap-5 px-2">
          <Formik
            initialValues={{
              budget: [MIN, MAX],
              amenities: [],
            }}
            onSubmit={async (values) => {
              setLocalLoading(true);
              
              await dispatch(
                setData({
                  budget: { min: values.budget[0], max: values.budget[1] },
                  amenities: values.amenities,
                })
              );
            }}
          >
            {() => (
              <Form className="flex-1 bg-gray-100 p-3 rounded-md sticky top-20 h-fit">
                <h1 className="text-lg text-gray-700 mb-2 font-bold">
                  Filter by:
                </h1>
            
                <div className="mb-4 border p-4 rounded-lg">
                  <h2 className="text-sm font-medium text-gray-700">
                    Amenities
                  </h2>
                  <ul className="mt-2 space-y-2">
                    {[
                      "Swimming Pool",
                      "Gym",
                      "Spa",
                      "Restaurant",
                      "Parking",
                      "Free parking on premises",
                      "Kitchen",
                      "Washing Machine",
                      "Air Conditioning",
                      "BBQ grill",
                      "Hot tub",
                      "Beach Access",
                    ].map((amenity) => (
                      <li key={amenity}>
                        <label className="flex items-center">
                          <Field
                            type="checkbox"
                            name="amenities"
                            value={amenity}
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          />
                          <span className="ml-2 text-gray-700">{amenity}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="submit"
                  className={`py-2 rounded-lg text-white w-full font-medium cursor-pointer ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Apply filters"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-span-12 lg:col-span-9 bg-gray-100 p-5">
          {paginatedResults.length > 0 ? (
            paginatedResults.map((hotel) => (
              <div
                key={hotel._id.toString()}
                className="flex flex-col p-4 min-w-full my-4 rounded-lg bg-white shadow-md md:max-w-xl md:flex-row transform transition-transform hover:scale-105 hover:shadow-md hover:bg-varGray"
                onClick={() => handleClick(hotel._id.toString())}
              >
                <img
                  className="aspect-square rounded-xl w-full object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={hotel?.imageUrls[0]}
                  alt=""
                />
                <div className="flex flex-col justify-start p-6">
                  <h5 className="mb-2 text-2xl font-bold text-gray-800">
                    {hotel?.name}
                  </h5>
                  <p className="text-xs text-gray-500">{hotel?.place}</p>
                  <p className="mb-4 text-base text-gray-600">
                    {hotel?.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels available</p>
          )}
        </div>
      </div>
      <div className="flex justify-center py-5">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            disabled={active === 1}
            className={`py-2 px-4 rounded-lg text-white ${
              active === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700"
            }`}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setActive(index + 1)}
                className={`py-2 px-4 rounded-lg ${
                  active === index + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={next}
            disabled={active === totalPages}
            className={`py-2 px-4 rounded-lg text-white ${
              active === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-400"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
