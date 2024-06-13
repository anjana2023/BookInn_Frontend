import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API } from "../../constants";
import React from "react";

const BookingsListPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    // Fetch bookings data from API
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${USER_API}/allBookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
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
      <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-xl">You have no bookings yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="w-full bg-gray-800 text-white">
                <th className="py-2 px-4 border-b">Hotel Name</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Check-in Date</th>
                <th className="py-2 px-4 border-b">Check-out Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: any) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-200 cursor-pointer transition duration-300"
                  onClick={() =>
                    (window.location.href = `/bookingDetails/${booking._id}`)
                  }
                >
                
                  <td className="py-2 px-4 border-b text-center">
                    {formatDate(booking.checkIn)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {formatDate(booking.checkOut)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingsListPage;
