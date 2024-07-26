import React from "react";
import Navbar from "../../components/user/NavBar/Navbar";
import Hotel from "./Hotels"
const Hotelss=()=>{
    return(
        <div className="flex flex-col min-h-screen">
      <Navbar />
<Hotel />
      </div>
    )
}
export default Hotelss