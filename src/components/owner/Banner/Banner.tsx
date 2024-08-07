import  { useState, useCallback, useEffect } from "react";
import owner1 from "../../../assets/images/owner1.jpg";

const names = ["Hotel"];

const Banner = () => {
  const [newName, setNewName] = useState("");
  
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setNewName(names[index]);
  }, []);
  
  useEffect(() => {
    const intervalID = setInterval(shuffle, 3000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <div className="relative h-[500px] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${owner1})` }}>
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          <span className="zigzag-animation">Your</span>{" "}
          <span className="text-orange-500">{newName},</span>{" "}
          <span className="zigzag-animation">Their</span>{" "}
          <span className="text-orange-500">Next </span>
          <span className="zigzag-animation">Destination</span>{" "}
        </h1>
      </div>
     
    </div>
  );
};

export default Banner;
