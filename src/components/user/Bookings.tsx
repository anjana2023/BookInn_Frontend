import { useState, useEffect } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import { BsCalendarCheck, BsCalendarX, BsBoxArrowRight } from "react-icons/bs";

const BookingsListPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(5); // Number of bookings to display per page

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

  // Calculate the current bookings to display
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Calculate total pages
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8 bg-white ">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-xl text-center">You have no bookings yet</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 bg-white">
            {currentBookings.map((booking) => (
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
                  <div className="text-orange-400">
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
                  className="text-center text-orange-500 hover:underline cursor-pointer mt-4"
                  onClick={() => (window.location.href = `/bookingdetails/${booking._id}`)}
                >
                  View Details
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-4 py-2 rounded-md ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                } hover:bg-blue-400`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookingsListPage;
