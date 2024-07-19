import React from "react";
import Navbar from "../components/user/NavBar/Navbar";
import Footer from "../components/user/Footer/Footer";
import Banner from "../components/user/Banner/Banner"
import Body from "../components/user/Body/Body";
const Home = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Body />
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;
