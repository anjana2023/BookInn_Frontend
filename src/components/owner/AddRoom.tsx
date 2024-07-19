import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useHotelList from "../../hooks/owner/UseHotelList";
import { OWNER_API } from "../../constants";
import axiosJWT from "../../utils/axiosService";
import showToast from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const AddRoom: React.FC = () => {
    const { hotels } = useHotelList();
    const [roomNumbers, setRoomNumbers] = useState<number[]>([]);
    const [roomNumberError, setRoomNumberError] = useState<string | null>(null);
    const navigate=useNavigate()
  
    const handleSubmit = async (values: any) => {

      const data={
        title: values.name,
        maxAdults: values.maxAdults,
        maxChildren: values.maxChildren,
        price: values.price,
        desc: values.description,
        roomNumbers: roomNumbers,
      }
  console.log(data);


  const response = await axiosJWT
      .post(
        `${OWNER_API}/addRoom/${values.hotelId}`,
        data)
      .then(({ data }) => {
        showToast(data.message)
        navigate("/owner/hotels")
      })
      .catch(({ response }) => {
        showToast(response?.data?.message, "error")
      })
    };
  
    const handleAddRoomNumber = (roomNumber: string) => {
        const number = parseInt(roomNumber, 10);
        if (!isNaN(number) && number > 0 && number <= 9999) {
          if (!roomNumbers.includes(number)) {
            setRoomNumbers([...roomNumbers, number]);
            setRoomNumberError(null); // Clear error when valid number is added
          } else {
            setRoomNumberError("Room number already exists.");
          }
        } else {
          setRoomNumberError("Please enter a valid room number (1-9999) without leading zeros.");
        }
      };
      
    const handleRemoveRoomNumber = (index: number) => {
      setRoomNumbers(roomNumbers.filter((_, i) => i !== index));
    };

    const hotelAddValidation = Yup.object().shape({
        name: Yup.string().required("Room Name is required"),
        description: Yup.string().required("Description is required"),
        hotelId: Yup.string().required("Hotel is required"),
        price: Yup.number().required("Price is required").positive("Price must be positive"),
        maxAdults: Yup.number().required("Max Adults is required").positive("Max Adults must be positive"),
        maxChildren: Yup.number().required("Max Children is required").positive("Max Children must be positive"),
      });

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          hotelId: "",
          maxAdults: 0,
          maxChildren: 0,
          price: "",
          desc: "",
        }}
        validationSchema={hotelAddValidation}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <div className="px-4 py-7 md:px-14 flex justify-center">
            <div className="px-4 py-7 md:px-14 rounded-3xl shadow-lg border border-spacing-y-9  w-8/12   items-center ">
              <h1 className="p-6 text-2xl md:text-3xl font-bold mb-4 text-center">
                Add Room
              </h1>
              <Form>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Room Name:
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Name"
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="name" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Description:
                    </label>
                    <Field
                      type="text"
                      name="description"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Enter the location"
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="description" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Hotel:
                    </label>
                    <Field
                      as="select"
                      name="hotelId"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value="" label="Select a hotel" />
                      {hotels.map((hotel, index) => (
                        <option key={index} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                    </Field>
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="hotelId" />
                    </span>
                  </div>

                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Price:
                    </label>
                    <Field
                      type="text"
                      name="price"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      placeholder="Enter the price"
                    />
                    <span className="text-Strawberry_red text-sm">
                      <ErrorMessage name="price" />
                    </span>
                  </div>



                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Maximum Adults:
                    </label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button
                        title="button"
                        type="button"
                        onClick={() =>
                          setFieldValue("maxAdults", Math.max(0, values.maxAdults - 1))
                        }
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        -
                      </button>
                      <span
                        data-input-counter
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {values.maxAdults}
                      </span>
                      <button
                        title="button"
                        type="button"
                        onClick={() => setFieldValue("maxAdults", values.maxAdults + 1)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="maxAdults" />
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Maximum Children:
                    </label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button
                        title="button"
                        type="button"
                        onClick={() =>
                          setFieldValue("maxChildren", Math.max(0, values.maxChildren - 1))
                        }
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        -
                      </button>
                      <span
                        data-input-counter
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {values.maxChildren}
                      </span>
                      <button
                        title="button"
                        type="button"
                        onClick={() => setFieldValue("maxChildren", values.maxChildren + 1)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-red-500 text-sm">
                      <ErrorMessage name="maxChildren" />
                    </span>
                  </div>

                  <div className="col-span-2">
                    <label className="text-gray-700 text-lg font-bold mb-2">
                      Room Numbers:
                    </label>
                    <div className="flex items-center ">
                      <Field
                        type="number"
                        name="roomNumber"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        placeholder="Enter room number"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddRoomNumber(values.roomNumber)}
                        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add
                      </button>
                    </div>
                    {roomNumberError && (
                      <div className="text-Strawberry_red text-sm mt-1">
                        {roomNumberError}
                      </div>
                    )}
                    <div className="mt-2 grid grid-cols-12 gap-2">
                      {roomNumbers.map((roomNumber, index) => (
                        <div key={index} className="col-span-1 flex items-center mt-1 w-fit">
                          <span>{roomNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveRoomNumber(index)}
                            className="ml-2 bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add other fields here */}

                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddRoom;

