import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import showToast from "../../utils/toast";

const formatDate = (dateString:any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ViewBooking = () => {
  const { id } = useParams();
  
  // Fetch booking details from the Redux store
  const {
    checkIn,
    checkOut,
    price,
    guests,
    name,
    place,
    image,
    city,
    district,
    pincode,
    country,
    days,
    hotelId,
  } = useAppSelector((state) => state.bookingSlice);

  // Format dates
  const formattedCheckInDate = formatDate(checkIn);
  const formattedCheckOutDate = formatDate(checkOut);

  if (!id) {
    showToast("Invalid booking ID", "error");
    return <div>Invalid booking ID</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="text-center mb-8">
         
          <div className="bg-green-100 text-green-600 inline-block rounded-full p-4 mb-4">
            <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <p className="text-lg text-gray-700">Hotel {name}</p>
          <p className="text-gray-500">Check-in: {formattedCheckInDate} - Check-out: {formattedCheckOutDate}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border p-4 rounded-lg bg-gray-50">
            <img
              src={image}
              alt={name}
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{name}</h2>
            <p className="text-gray-700">{place}</p>
            <p className="text-gray-500">{city}, {district}, {pincode}, {country}</p>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Your Booking Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Check-in:</span> {formattedCheckInDate}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Check-out:</span> {formattedCheckOutDate}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Total length of stay:</span> {days} night(s)
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">No. of Guests:</span> {guests} guest(s)
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-small text-blue-500">
                  Total Amount: ₹ {price}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-700">Your trip starts Friday, {formattedCheckInDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;