import React from "react";
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import { Link } from "react-router-dom";
import HomePage from "../HomePage";

const Body = () => {
  return (
    <div className="relative bg-white">
      <div className="cover-center text-center text-orange-500 py-8">
        <p>
          <strong className="text-xl pb-4 font-semibold text-xl md:text-xl lg:text-2xl leading-tight">
            What type of properties can be listed on BookInn?
          </strong>
        </p>
        <HomePage />
      </div>
    </div>
  );
};

export default Body;
