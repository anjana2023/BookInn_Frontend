import { useState, useRef, useEffect } from "react";
import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format, addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAppDispatch } from "../../redux/store/store";

import { setData } from "../../redux/slices/searchingSlice";


type OptionType = {
  adult: number;
  children: number;
  room: number;
};

type DatesType = {
  startDate: Date;
  endDate: Date;
};

const SearchBoxDetail = () => {

  const dispatch = useAppDispatch();
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [dates, setDates] = useState<DatesType>({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
  });
  const [options, setOptions] = useState<OptionType>({
    adult: 2,
    children: 0,
    room: 1,
  });

  const dateRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (options: OptionType, dates: DatesType) => {
   

    try {
      const { } = options;
      const { startDate, endDate } = dates;
    

      dispatch(setData({ options, dates: [{ startDate, endDate }] }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOption = (name: keyof OptionType, operation: string) => {
    setOptions(prev => {
      return {
        ...prev,
        [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setDates({
      startDate: selection.startDate ?? new Date(),
      endDate: selection.endDate ?? addDays(new Date(), 1),
    });
  };
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setOpenDate(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOpenOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center space-x-4 py-1 px-3 bg-Alabaster border-2 shadow-xl rounded-lg -mt-8 mx-auto max-w-fit">
      <div className="flex items-center space-x-2 cursor-pointer relative" ref={dateRef}>
        <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500" />
        <span onClick={() => setOpenDate(!openDate)} className="text-gray-700">
          {`${format(dates.startDate, "MM/dd/yyyy")} to ${format(dates.endDate, "MM/dd/yyyy")}`}
        </span>
        {openDate && (
          <div className="absolute top-12 left-0 z-50 mt-2">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={[{ startDate: dates.startDate, endDate: dates.endDate, key: "selection" }]}
              className="shadow-md rounded-lg"
              minDate={new Date()}
            />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 cursor-pointer relative" ref={optionsRef}>
        <FontAwesomeIcon icon={faPerson} className="text-gray-500" />
        <span onClick={() => setOpenOptions(!openOptions)} className="text-gray-700">
          {`${options.adult} adult · ${options.children} children · ${options.room} room`}
        </span>
        {openOptions && (
          <div className="absolute top-12 left-0 w-48 bg-white p-4 rounded-lg shadow-md z-50">
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
        className="bg-blue-600 text-white font-bold rounded-lg px-4 py-1"
        onClick={() => handleSearch(options, dates)}
      >
        Update
      </button>
    </div>
  );
};

export default SearchBoxDetail;
