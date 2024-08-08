import useSWR, { mutate } from "swr";
import CancelBookingModal from "../../pages/user/cancelBookingModal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CHAT_API, USER_API } from "../../constants";
import showToast from "../../utils/toast";
import { BookingInterface, BookingResponse } from "../../types/hotelInterface";
import { fetcher } from "../../utils/fetcher";
import axiosJWT from "../../utils/axiosService";
import AddReview from "../../components/AddReview";
import { useAppSelector } from "../../redux/store/store";
import { BsChatDots } from "react-icons/bs";
import  starImg from "../../assets/images/stars.jpg";

import axios from "axios";

const BookingDetails = () => {
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.userSlice);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const navigate = useNavigate();
  const { data, error } = useSWR<BookingResponse>(
    `${USER_API}/bookingdetails/${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      
      setBooking(data.data); 
    }
  }, [data]);

  useEffect(() => {}, [booking]);

  if (error) {
 
    return <div>Error fetching booking details.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleChat = () => {
    axios
      .post(CHAT_API + `/conversations`, {
        senderId: user.id,
        recieverId: booking?.hotelId,
      })
      .then(({}) => {
        navigate("/user/chat");
      })
      .catch(() => {
        console.log("error in sending chat");
      });
  };

  const handleCancellation = async (reason: string) => {
    if (!booking) return;

    try {
      const response = await axiosJWT.patch(
        `${USER_API}/booking/cancel/${booking.bookingId}`,
        { reason, status: "cancelled" }
      );

      setBooking((prevBooking) => ({
        ...prevBooking!,
        status: response.data.booking.status ?? prevBooking?.status,
      }));

      mutate(`${USER_API}/bookingdetails/${id}`);

      showToast("Booking cancelled successfully", "success");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      showToast("Oops! Something went wrong", "error");
    }
  };

  const showReview = () => {
    setShowReviewModal(true);
  };


  const canCancelBooking =
    booking &&
    booking.paymentStatus !== "Refunded" &&
    (booking.status === "pending" || booking.status === "booked" || booking.paymentMethod === "Wallet");

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
                        {new Date(booking.checkInDate).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-600 mb-1">
                        Check-out-Date
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.checkOutDate).toLocaleString()}
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
                    alt="image"
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

                {/* Enhanced Chat Button */}
                <div className="flex justify-center my-4 bg">
                  <button
                    onClick={handleChat}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden  text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-400 to-purple-600 group-hover:from-blue-400 group-hover:to-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-400 dark:focus:ring-blue-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  bg-orange-400 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center">
                      <BsChatDots className="w-5 h-5 mr-2" />
                      Chat with Hotel
                    </span>
                  </button>
                </div>
                <div className="flex justify-center mt-5">
                  {booking &&
                  new Date(booking.checkOutDate).getTime() < Date.now() ? (
                    <div
                      onClick={showReview}
                      className="show-chat mx-10 mb-6 mt-4 text-Marine_blue hover:text-green-600 flex flex-col justify-end items-center cursor-pointer"
                    >
                      <img src={starImg} className="h-10" alt="user" />
                      <span>Rate & Review</span>
                    </div>
                  ) : (
                    ""
                  )}
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
              <div>
                <AddReview
                  isOpen={showReviewModal}
                  onClose={() => setShowReviewModal(false)}
                  id={booking.hotelId._id}
                />
              </div>
            </div>
          )}
          <div
            className={`flex justify-${
              canCancelBooking ? "between" : "center"
            } mx-40`}
          >
            <button
              onClick={() => navigate(-1)}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Go Back
              </span>
            </button>
            {canCancelBooking && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-400 to-pink-600 group-hover:from-red-400 group-hover:to-pink-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Cancel Booking
                </span>
              </button>
            )}
            {isModalOpen && (
              <CancelBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleCancellation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
