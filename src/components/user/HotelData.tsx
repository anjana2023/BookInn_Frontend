import React from "react";
import { useNavigate } from "react-router-dom";

interface HotelDataProps {
    _id:string;
    imageUrls: string[];
    name: string;
    place: string;
    stayType: string;
    price:number;
  }     
  
  const HotelData: React.FC<HotelDataProps> = ({_id,imageUrls, name, place, stayType ,price}) => {
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate(`/user/hotelDetails/${_id}`)
  }
  
    return (
  
      <div  onClick={handleClick} className="bg-varGray col-span-1 relative border rounded-3xl shadow-sm p-2  border-gray-200  dark:bg-gray-800 dark:border-gray-700">
        <div className=" relative rounded-lg">
          
          <img
            className="rounded-2xl object-cover aspect-square"
            src={imageUrls[0]}
            alt={name}
          />
        </div>
  
        <div className=" pt-2 h-fit rounded-lg">
          <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
  
          <div className="flex justify-between">
            <p className="mb-1 text-sm font-thin text-gray-700 dark:text-gray-400">
              {stayType}
            </p>
            <p className="mb-1 text-sm font-thin text-gray-700 dark:text-gray-400">
              {place}
            </p>
          </div>
  
          <p className="mb-1 text-lg font-thin text-gray-700 dark:text-gray-400">
          {price}
          </p>
        </div>
      </div>
    );
  };
  export default HotelData