import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="relative h-60 bg-gray-800 flex flex-col justify-center items-center text-white">
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
    </div>
  );
};

export default Body;
