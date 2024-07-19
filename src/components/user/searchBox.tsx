import React, { useState, useEffect, useRef } from "react";
import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAppSelector } from "../../redux/store/store";

const SearchBoxUser = ({ handleSearch }) => {
  const data = useAppSelector((state) => state.searchingSlice);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
  });
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [destination, setDestination] = useState(data.place);

  const dateRef = useRef(null);
  const optionsRef = useRef(null);

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleDateChange = (item) => {
    const { startDate, endDate } = item.selection;
    if (endDate <= startDate) {
      setDates({
        startDate: startDate,
        endDate: addDays(startDate, 1),
      });
    } else {
      setDates({
        startDate: startDate,
        endDate: endDate,
      });
    }
  };

  const handleClickOutside = (event) => {
    if (dateRef.current && !dateRef.current.contains(event.target)) {
      setOpenDate(false);
    }
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setOpenOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4 p-4 bg-white border border-gray-200 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Enter your destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <button
            onClick={() => setOpenDate(!openDate)}
            className="w-full p-3 flex justify-between items-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">{`${format(
              dates.startDate,
              "MM/dd/yyyy"
            )} to ${format(dates.endDate, "MM/dd/yyyy")}`}</span>
            <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500" />
          </button>
          {openDate && (
            <div className="absolute top-full left-0 z-50 mt-2 bg-white shadow-lg rounded-lg">
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    startDate: dates.startDate,
                    endDate: dates.endDate,
                    key: "selection",
                  },
                ]}
                className="shadow-md rounded-lg"
                minDate={new Date()}
              />
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setOpenOptions(!openOptions)}
            className="w-full p-3 flex justify-between items-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            <FontAwesomeIcon icon={faPerson} className="text-gray-500" />
          </button>
          {openOptions && (
            <div className="absolute top-full left-0 w-64 bg-white p-4 rounded-lg shadow-lg z-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Adult</span>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={options.adult <= 1}
                    className="text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="text-gray-700">{options.adult}</span>
                  <button
                    className="text-gray-700 bg-gray-200 rounded-full px-2 py-1"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Children</span>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={options.children <= 0}
                    className="text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="text-gray-700">{options.children}</span>
                  <button
                    className="text-gray-700 bg-gray-200 rounded-full px-2 py-1"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Room</span>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={options.room <= 1}
                    className="text-gray-700 bg-gray-200 rounded-full px-2 py-1 disabled:opacity-50"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="text-gray-700">{options.room}</span>
                  <button
                    className="text-gray-700 bg-gray-200 rounded-full px-2 py-1"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 mt-2 md:mt-0 w-full md:w-auto"
          onClick={() => handleSearch(destination, options, dates)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBoxUser;
