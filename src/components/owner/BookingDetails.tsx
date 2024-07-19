import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CHAT_API, USER_API } from "../../constants";
import { BookingInterface, BookingResponse } from "../../types/hotelInterface";
import axios from "axios";
import showToast from "../../utils/toast";
import { useFetchData } from "../../utils/fetcher";
import axiosJWT from "../../utils/axiosService";
import { BsChatDots } from "react-icons/bs";

const BookingDetails = () => {
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data, isError: error } = useFetchData<BookingResponse>(`${USER_API}/bookingdetails/${id}`);
  console.log(data, "..............bookings........");

  useEffect(() => {
    if (data) {
      setBooking(data.data); // Adjusted to use data.data
    }
  }, [data]);

  if (error) {
    console.error("Error fetching booking:", error);
    return <div>Error fetching booking details.</div>;
  }
console.log(booking,"...........&&&&&&&&&&&&&&&&&&&&&&&&&")
  if (!data) {
    return <div>Loading...</div>;
  }


  const handleChat = () => {
    console.log(booking,"........33333333333333333333333333333333333333333333333")

    console.log(booking?.userId._id,"........userid")
    console.log( booking?.hotelId.ownerId,"........ownerId......")
    axios
      .post(CHAT_API + `/conversations`, {
        senderId: booking?.userId._id,
        recieverId: booking?.hotelId.ownerId,
      })
      .then(({ data }) => {
        console.log(data, "dataaaaaaaa");
        navigate("/owner/chat");
      })
      .catch(() => {
        console.log("error in sending chat");
      });
  };

  return (
    <div className="w-screen h-fit overflow-hidden flex justify-center">
      <div className="bg-varWhite min-h-screen p-4">
        <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl text-center font-semibold mb-4">
            Booking Details
          </h1>
          {booking && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="items-center rounded-lg mb-4">
                <div className="border rounded-lg p-4">
                  <h2 className="text-lg font-medium mb-2">
                    BOOKING ID : {booking.bookingId}
                  </h2>
                  <p className="text-base text-green-500 mb-2">
                    Booking Status: {booking.status}
                  </p>
                  <p className="text-base text-red-500 mb-2">
                    Payment Method: {booking.paymentMethod}
                  </p>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-xl font-bold text-gray-600 mb-1">
                        Check-in-Date
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.checkInDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-600 mb-1">
                        Check-out-Date
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.checkOutDate}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 my-3">
                  <h2 className="text-lg font-medium mb-2">User Details</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      Name: {booking.firstName} {booking.lastName}
                    </p>
                    <p>Email: {booking.email}</p>
                    <p>Phone: {booking.phoneNumber}</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 my-3">
                  <h2 className="text-lg font-medium mb-2">Stay Address</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>Street: {booking.hotelId.address.streetAddress}</p>
                    <p>City: {booking.hotelId.address.city}</p>
                    <p>LandMark: {booking.hotelId.address.landMark}</p>
                    <p>District: {booking.hotelId.address.district}</p>
                    <p>Pincode: {booking.hotelId.address.pincode}</p>
                    <p>Country: {booking.hotelId.address.country}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="p-5 text-black rounded-lg">
                  <img
                    alt="hotel"
                    src={booking?.hotelId?.imageUrls[0]}
                    className="p-3 h-64 w-full"
                  />
                  <h2 className="px-3 text-xl text-right font-medium mb-2">
                    {booking.hotelId.name}
                  </h2>
                  <h2 className="px-3 text-base text-right font-medium mb-2">
                    {booking.hotelId.place}
                  </h2>
                </div>
                <div className="flex justify-center my-4 bg">
                  <button
                    onClick={handleChat}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-400 to-purple-600 group-hover:from-blue-400 group-hover:to-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-400 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  bg-gradient-400 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center">
                      <BsChatDots className="w-5 h-5 mr-2" />
                      Chat with Hotel
                    </span>
                  </button>
                  </div>
                <div className="border rounded-lg p-4 my-3">
                  <h2 className="text-lg font-medium mb-2">Property Rules</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {booking.hotelId.propertyRules.map((rule, index) => (
                      <p key={index}>{rule}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center mx-40">
            <button
              onClick={() => navigate(-1)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Go Back
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
