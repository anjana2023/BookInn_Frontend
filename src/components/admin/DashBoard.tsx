import Card from "./Card";
import useDashboard from "../../hooks/admin/useDashboard";
import hotelImage from "../../assets/images/hotelorg.jpg";
import userImg from "../../assets/images/dp.jpg";
import bookingImg from "../../assets/images/bookingssss.webp";
import revenue from "../../assets/images/reven.png";
import AreaChartComponent from "./AreaChart";
import RevenueChart from "./RevenueChart";

const DashBoard = () => {
  const {
    userCount,
    totalRevenue,
    ownerCount,
    hotelCount,
    bookingCount,
    graphData,
  } = useDashboard();

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Card title="Users" total={userCount.toString()}>
          <img src={userImg} alt="user" className="w-full h-auto" />
        </Card>
        <Card title="Owners" total={ownerCount.toString()}>
          <img src={userImg} alt="owner" className="w-full h-auto" />
        </Card>
        <Card title="Hotels" total={hotelCount.toString()}>
          <img src={hotelImage} alt="hotel" className="w-full h-auto" />
        </Card>
        <Card title="Bookings" total={bookingCount.toString()}>
          <img src={bookingImg} alt="booking" className="h-11 w-auto" />
        </Card>
        <Card title="Revenue" total={totalRevenue.toString()}>
          <img src={revenue} alt="revenue" className="h-11 w-auto" />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-2 lg:gap-6">
        <div className="bg-varWhite border shadow-md rounded-lg p-4">
          <AreaChartComponent data={graphData} />
        </div>
        <div className="bg-varWhite border shadow-md rounded-lg p-4">
          <RevenueChart />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
