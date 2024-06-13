import React from "react";

const Banner = () => {
  return (
    <>
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('./../src/assets/images/mal1.jpg')" }}
      >
       <div className="flex flex-col gap-4 justify-center xl:ml-10 lg:ml-2.5 md:ml-3.5 sm:ml-60 w-full h-full px-3 md:px-0">
          <h1 className="text-4xl md:text-5xl sm:text-6xl font-bold text-white text-animation">
            Find Your Perfect Stay,<br/>Every Time
          </h1>
        </div>
      </div>
      <section className="flex items-center border border-Red-200 justify-center p-2 container mx-auto rounded-lg h-auto relative bg-[#FFFFF] max-w-3xl -mt-8">
        <input
          className="shadow rounded py-2 px-10 text-gray-700 w-1/4 mr-2"
          type="text"
          placeholder="Where are you going?"
        />
        <input
          className="shadow rounded py-3 px-10 text-gray-700 w-1/4 mr-2"
          type="date"
        />
        <input
          className="shadow rounded py-3 px-10 text-gray-700 w-1/4 mr-2"
          type="date"
        />
        <button className="bg-orange-500 hover:bg-blue-600 text-white font-bold py-2 px-10 rounded w-1/4">
          Search
        </button>
      </section>
    </>
  );
};

export default Banner;
