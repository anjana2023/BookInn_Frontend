import React from "react";
import HomePage from "../HomePage";
import SearchBoxUser from "../searchBox";
import useUserHotels from "../../../hooks/user/useUserHotel";

const Body: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
  
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const {
    handleSearch,
  } = useUserHotels()

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-blue-500 py-12 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* <Lottie options={defaultOptions} height="100%" width="100%" /> */}
        </div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-4xl font-semibold mb-4 animated-text">
            Discover the Best Properties with <span className="text-yellow-300">BookInn</span>
          </h1>
          <p className="text-lg md:text-xl">
            Explore a variety of accommodations and find your perfect stay.
          </p>
        </div>
      </div>
      <div className="px-4 md:px-8 lg:px-12 mt-8">
        <SearchBoxUser handleSearch={handleSearch} />
        <HomePage />
      </div>
    </div>
  );
};

export default Body;
