import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loadStripe } from "@stripe/stripe-js";
import * as Yup from "yup";
import axios from "axios";
import { USER_API } from "../../constants";
import showToast from "../../utils/toast";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Please fill in your first name"),
  lastName: Yup.string().required("Please fill in your last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please fill in your email address"),
  country: Yup.string().required("Please select your country/region"),
  phone: Yup.string().required("Please fill in your phone number"),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const { id } = useParams<{ id: string }>();
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
  console.log(
    image,
    "..............................................................................................."
  );
  const formattedCheckInDate = formatDate(checkIn);
  const formattedCheckOutDate = formatDate(checkOut);

  const handleInputChange = (
    method: "Wallet" | "Online" | "pay_on_checkout"
  ) => {
    if (method === "Wallet") {
      //   const total = calculateTotalAmount(
      //     tableData?.capacity,
      //     tableData?.restaurantId.tableRatePerPerson
      //   );
      //   if (total > (wallet?.balance ?? 0))
      //     return setError("Insufficient balance");
      //   else setError(null);
      console.log("wallet");
    }
    if (method === "Online") {
      setPaymentMethod("Online");
    }
    if (method === "pay_on_checkout") {
      setPaymentMethod("pay_on_checkout");
    }
  };

  const handleSubmit = async (values: {
    firstName: any;
    lastName: any;
    email: any;
    phone: any;
  }) => {
    try {
      const stripePromise = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        hotelId,
        phoneNumber: values.phone,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        price,
        maxPeople: guests,
        totalDays: days,
        paymentMethod,
      };
      console.log(data, " jewajdbhsgvscfgvbh");

      const response = await axios.post(`${USER_API}/bookNow`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data.booking, ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");

      if (response.data.id) {
        const stripe = await stripePromise;
        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.id,
        });
        if (result?.error) console.error(result.error);

        const bookingId = response.data.booking.bookingId;
        const _id = response.data.booking._id;

        console.log(_id,"....................")
        Navigate({
          to: `${USER_API}/payment_status/${_id}?success=true`,
        });
      } else {
        showToast(response.data.message, "error");
      }




    } catch (error) {
      console.log("Error in creating order", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto p-4">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            country: "India",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="bg-white shadow-lg rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="border p-4 rounded-lg mb-4 bg-gray-50">
                    <h1 className="text-3xl font-bold mb-4">{name}</h1>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p>
                          {city}, {district}, {pincode}, {country}
                        </p>
                        <p className="text-green-600 mt-2">
                          Great location — 8.8
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-blue-500 font-bold text-xl">
                            9.4
                          </span>
                          <span className="text-gray-700">
                            Superb - 579 reviews
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <img
                          src={image}
                          alt="uahgihai"
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg mb-4 bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">
                      Your booking details
                    </h2>
                    <p>
                      Check-in: <strong>{formattedCheckInDate}</strong>
                    </p>
                    <p>
                      Check-out: <strong>{formattedCheckOutDate}</strong>
                    </p>
                    <p>
                      Total length of stay: <strong>{days} night</strong>
                    </p>
                    <p>
                      No of Guests: <strong>{guests} guests</strong>
                    </p>
                    <div
                      onClick={() => navigate(-1)}
                      className="text-blue-500 underline cursor-pointer mt-2"
                    >
                      Change your selection
                    </div>
                  </div>

                  <div className="border p-4 rounded-lg mb-4 bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">
                      Your price summary
                    </h2>
                    <p className="text-lg">
                      Total Amount: <strong>₹ {price}</strong>
                    </p>
                  </div>

                  <div className="border p-4 rounded-lg mb-4 bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">Payment</h2>
                    <div className="p-2">
                      <label
                        htmlFor="inlineRadio1"
                        className="block mb-2 text-sm font-semibold text-gray-900"
                      >
                        Payment Method
                      </label>
                      <div>
                        <div className="mb-4 flex items-center">
                          <input
                            className="mr-2 h-5 w-5"
                            type="radio"
                            name="paymentMethod"
                            id="inlineRadio2"
                            value="Online"
                            defaultChecked
                            onChange={() => handleInputChange("Online")}
                          />
                          <label
                            htmlFor="inlineRadio2"
                            className="cursor-pointer"
                          >
                            Online
                          </label>
                        </div>
                        <div className="mb-4 flex items-center">
                          <input
                            className="mr-2 h-5 w-5"
                            type="radio"
                            name="paymentMethod"
                            id="inlineRadio1"
                            value="Wallet"
                            onChange={() => handleInputChange("Wallet")}
                          />
                          <label
                            htmlFor="inlineRadio1"
                            className="cursor-pointer"
                          >
                            Wallet
                          </label>
                        </div>
                        <div className="mb-4 flex items-center">
                          <input
                            className="mr-2 h-5 w-5"
                            type="radio"
                            name="paymentMethod"
                            id="inlineRadio1"
                            value="pay_on_checkout"
                            onChange={() =>
                              handleInputChange("pay_on_checkout")
                            }
                          />
                          <label
                            htmlFor="inlineRadio1"
                            className="cursor-pointer"
                          >
                            Pay At Checkout
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
                <div>
                  <div className="border p-4 rounded-lg bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">
                      Enter your details
                    </h2>
                    <div className="grid gap-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="firstName"
                          className="mb-1 text-sm font-semibold"
                        >
                          Please fill in your first name
                        </label>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="border p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="lastName"
                          className="mb-1 text-sm font-semibold"
                        >
                          Please fill in your last name
                        </label>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="border p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="mb-1 text-sm font-semibold"
                        >
                          Please fill in your email address
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="border p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="phone"
                          className="mb-1 text-sm font-semibold"
                        >
                          Please fill in your phone number
                        </label>
                        <Field
                          type="text"
                          id="phone"
                          name="phone"
                          className="border p-2 rounded focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="country"
                          className="mb-1 text-sm font-semibold"
                        >
                          Please select your country/region
                        </label>
                        <Field
                          as="select"
                          id="country"
                          name="country"
                          className="border p-2 rounded focus:outline-none focus:border-blue-500"
                        >
                          <option value="India">India</option>
                          {/* Add more country options as needed */}
                        </Field>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default CheckoutPage;
