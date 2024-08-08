import Navbar from "../../components/owner/Navbar/Navbar";
import Banner from "../../components/owner/Banner/Banner";
import Footer from "../../components/owner/Footer/Footer";
import Body from "../../components/owner/Body/Body";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Banner />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;
