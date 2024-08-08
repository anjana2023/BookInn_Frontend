import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import own1 from "../../../assets/images/own1.jpg";
import own2 from "../../../assets/images/own2.jpg";
import own3 from "../../../assets/images/own3.jpg";
import own4 from "../../../assets/images/own4.jpg";

const Body = () => {
  const destinations = [
    { name: "New Delhi", image: own1 },
    { name: "Bangalore", image: own2 },
    { name: "Mumbai", image: own3 },
    { name: "Chennai", image: own4 },
  ];

  return (
    <div className="relative h-auto bg-gray-800 flex flex-col justify-center items-center text-white">
      <div className="text-center py-8">
        <p className="text-3xl pb-4">
          <strong>What type of properties can be listed on BookInn?</strong>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Link
          to="/owner/addhotel"
          className="flex items-center justify-center w-64 h-12 px-4 py-2 rounded bg-white text-gray-800 text-lg font-semibold border border-gray-300 shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
          type="button"
        >
          <FaPlus className="mr-2" />
          Add Hotel
        </Link>
      </div>
      <br />
      <div className="flex items-center">
        <br />
        <Link
          to="/owner/addRoom"
          className="flex flex-col-2 items-center justify-center w-50 h-12 px-6 py-6 rounded bg-orange-500 text-gray-800 text-lg font-semibold border border-gray-300 shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
          type="button"
        >
          <FaPlus className="mr-2" />
          Add Rooms
        </Link>
      </div>
      <div className="text-center py-8">
        <p className="text-3xl pb-4">
          <strong>Trending destinations</strong>
        </p>
        <p className="text-lg pb-4">
          Most popular choices for travellers from India
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-4 pb-8">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="relative w-80 h-60 rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent text-white">
              <h3 className="text-xl font-bold">{dest.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
