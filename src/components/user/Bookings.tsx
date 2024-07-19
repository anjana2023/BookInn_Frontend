import { useState, useEffect } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import { BsCalendarCheck, BsCalendarX, BsBoxArrowRight } from "react-icons/bs";
import React from "react";

const BookingsListPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/allBookings`);
        setBookings(response.data.bookings.bookingDetails);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-xl text-center">You have no bookings yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="border-b pb-4 mb-4 flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {booking.firstName} {booking.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{booking.email}</p>
                </div>
                <div className="text-blue-500">
                  <BsBoxArrowRight size={24} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center text-gray-700">
                  <BsCalendarCheck className="mr-2" />
                  <p>
                    <span className="font-semibold">Check-in:</span>{" "}
                    {formatDate(booking.checkInDate)}
                  </p>
                </div>
                <div className="flex items-center text-gray-700">
                  <BsCalendarX className="mr-2" />
                  <p>
                    <span className="font-semibold">Check-out:</span>{" "}
                    {formatDate(booking.checkOutDate)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <p className="font-semibold text-gray-900">
                  Booking ID: {booking.bookingId}
                </p>
              </div>
              <p
                className="text-center text-blue-500 hover:underline cursor-pointer mt-4"
                onClick={() => (window.location.href = `/bookingdetails/${booking._id}`)}
              >
                View Details
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsListPage;
