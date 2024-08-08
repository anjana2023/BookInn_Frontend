import React from "react";
import doc1 from "../../../assets/images/doc1.svg";
import doc2 from "../../../assets/images/doc2.svg";
import doc3 from "../../../assets/images/doc3.svg";
import own1 from "../../../assets/images/own1.jpg";
import own2 from "../../../assets/images/own2.jpg";
import own3 from "../../../assets/images/own3.jpg";
import own4 from "../../../assets/images/own4.jpg";

const Banner: React.FC = () => {

  const destinations = [
    { name: "New Delhi", image: own1, description: "Experience the vibrant culture and rich history of India’s capital." },
    { name: "Bangalore", image: own2, description: "Explore the Silicon Valley of India, known for its parks and nightlife." },
    { name: "Mumbai", image: own3, description: "Discover the bustling streets and the heart of Bollywood." },
    { name: "Chennai", image: own4, description: "Enjoy the beautiful beaches and traditional South Indian cuisine." },
  ];

  return (
    <div className="relative h-[800px] overflow-hidden pt-10 pb-10">
      <div className="absolute inset-0 justify-center"></div>
      
      <h1 className="text-4xl font-bold text-center ">
        Most popular choices for travellers from India
      </h1>
      <p className=" text-xl text-center mb-8 px-4 pt-3">
        Whether you seek adventure, relaxation, or cultural experiences, these destinations offer something for everyone.
      </p>
     
      <div className="flex flex-wrap justify-center gap-4 px-4 pb-30">
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
              <h3 className="text-xl font-bold text-center">{dest.name}</h3>
              <p className="text-sm text-center">{dest.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col md:flex-row justify-around items-center text-center  pt-16  ">
        <div className="flex flex-col items-center pt-30 pb-30">
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
