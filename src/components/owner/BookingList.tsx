import  { useEffect, useState } from "react";
import useSWR from "swr";
import { OWNER_API } from "../../constants";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
import { BookingInterface } from "../../types/hotelInterface";

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
        }`}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
        }`}
      >
        Next
      </button>
    </div>
  );
};

const BookingList = () => {
  const [bookings, setBookings] = useState<BookingInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(4);  // Customize how many bookings per page
  const navigate = useNavigate();
  const { data, error } = useSWR(OWNER_API + "/bookings", fetcher);

  useEffect(() => {
    if (data) {
      setBookings(data.bookings);
    }
  }, [data]);

  if (error) {
    console.error("Error fetching bookings:", error);
    return <div className="text-red-500 text-center">Error fetching booking details.</div>;
  }

  if (!data) {
    return <div className="text-center">Loading...</div>;
  }

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-lg rounded-lg min-h-screen p-6 w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bookings</h1>
        <div className="overflow-x-auto">
          {currentBookings.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hotel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="py-4 px-6 whitespace-nowrap flex items-center space-x-4">
                      <img
                        src={booking.hotelId.imageUrls[0]}
                        alt={booking.hotelId.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          {booking.hotelId.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.hotelId.place}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-medium leading-5 rounded-full ${
                          booking.status === "booked"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {`₹${booking.price.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => navigate(`/owner/bookingdetails/${booking._id}`)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">No bookings yet</div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BookingList;
