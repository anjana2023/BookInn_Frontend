import React from "react";
import SearchBoxUser from "../searchBox";
import useUserHotels from "../../../hooks/user/useUserHotel";
import doc1 from "../../../assets/images/doc1.svg";
import doc2 from "../../../assets/images/doc2.svg";
import doc3 from "../../../assets/images/doc3.svg";

const Banner: React.FC = () => {
  const { handleSearch } = useUserHotels();

  return (
    <div className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0  justify-center">
        <div className="text-center text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find Your Perfect Stay,<br />Every Time
          </h1>
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-around items-center text-center px-6 md:px-12 py-6 bg-white">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 object-cover mb-4"
            src={doc1}
            alt="Search"
          />
          <p className="text-lg font-semibold">Search simply</p>
          <p>Search through 5 million hotels in just a few seconds.</p>
        </div>
        <div className="flex flex-col items-center my-6 md:my-0">
          <img
            className="w-32 h-32 object-cover mb-4"
            src={doc2}
            alt="Compare"
          />
          <p className="text-lg font-semibold">Compare confidently</p>
          <p>Compare hotel prices from 100s of sites at once.</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 object-cover mb-4"
            src={doc3}
            alt="Save"
          />
          <p className="text-lg font-semibold">Save big</p>
          <p>Discover a great deal to book on our partner sites.</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
