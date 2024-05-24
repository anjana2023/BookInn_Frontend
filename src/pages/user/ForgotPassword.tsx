import React from "react";
import { useFormik } from "formik";
import showToast from "../../utils/toast";
import axios from "axios";
import { emailValidation } from "../../utils/validation";
import { USER_API } from "../../constants";

const ForgotPassword = () => {
  const { values, touched, handleBlur, handleChange, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: emailValidation,
      onSubmit: ({ email }) => {
        axios
          .post(USER_API + "/auth/forgot-password", { email })
          .then(({ data }) => {
            showToast(data.message, "success");
          })
          .catch((response) => {
            console.log(response);
            showToast(response.message, "error");
          });
      },
    });

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url('../../src/assets/images/mal3.jpg')`, // Adjust the path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid gap-8 bg-opacity-50">
        <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100  bg-opacity-50 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
          <h1 className="pt-8 pb-5 font-bold text-blue-800 text-4xl text-center cursor-default">
            Please enter your email address
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 text-white text-lg">Email</label>
              <input
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-black-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-600">{errors.email}</p>
            )}

            <button
              className="bg-blue-600 text-gray-300  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
