import React from "react";
import { Link, useParams } from "react-router-dom";

interface PaymentMessageProps {
  isSuccess: boolean;
}

const Payment: React.FC<PaymentMessageProps> = ({ isSuccess }) => {
  const { id } = useParams();
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4">
      <div className={`bg-white p-8 rounded-lg shadow-xl w-full max-w-md ${isSuccess && "px-10"}`}>
        <div className="text-center">
          {isSuccess ? (
            <svg
              viewBox="0 0 24 24"
              className="text-green-500 w-20 h-20 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          ) : (
            <div className="w-20 h-20 mx-auto my-6">
              <img
                src="https://miro.medium.com/v2/resize:fit:810/1*OkeqV425CNZUQT2HSkTnJA.png"
                alt="Payment failed image"
                className="rounded-full"
              />
            </div>
          )}
          <h3 className="md:text-3xl text-xl text-gray-800 font-bold mb-4">
            {isSuccess ? "Booking Successful!" : "Payment Failed!"}
          </h3>
          <p className="text-gray-600 mb-6">
            {isSuccess
              ? "Thank you for completing your payment. Your booking is confirmed."
              : "Sorry, your payment was unsuccessful. Please try again later."}
          </p>
          <p className="text-blue-500 mb-8 font-medium">
            {isSuccess
              ? "Have a great day!"
              : "If the problem persists, please contact customer support."}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to={isSuccess ? `/bookingdetails/${id}` : "/"}
              className={`inline-block px-10 py-3 ${
                isSuccess
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white font-semibold rounded-lg shadow-lg transition duration-300`}
            >
              {isSuccess ? "View Booking" : "Go Back"}
            </Link>
            {isSuccess && (
              <Link
                to="/"
                className="bg-orange-500 hover:bg-orange-600 inline-block px-10 py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300"
              >
                Home Page
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
