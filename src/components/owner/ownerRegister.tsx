import React from "react";
import { useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterValidation } from "../../utils/validation";
import { OWNER_API } from "../../constants";
import showToast from "../../utils/toast";
import { setItemToLocalStorage } from "../../utils/localStorage";
import owner2 from "../../../src/assets/images/owner2.jpg";
const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    values,
    isSubmitting,
    touched,
    handleBlur,
    errors,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validationSchema: RegisterValidation,
    onSubmit: ({ name, email, password, phone }) => {
      axios
        .post(OWNER_API + "/auth/register", { name, email, password, phone })
        .then(({ data }) => {
          const { message, newOwner } = data;
          console.log(data);
          showToast(data.message, "success");
          setTimeout(() => {
            setItemToLocalStorage("ownerId", newOwner._id);
            navigate("/owner/auth/verifyOtp");
          }, 1000);
        })
        .catch((error) => {
          console.error("Error:", error); // Log the error
          const { response } = error;
          if (response) {
            const { data } = response;
            const { message } = data;
            showToast(message, "error");
          } else {
            showToast("An error occurred", "error");
          }
        });
    },
  });

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${owner2})`, // Replace 'path_to_your_image' with the actual path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid gap-6 bg-opacity-90">
        <div className="border-[10px] border-transparent rounded-[30px] bg-gray-100 bg-opacity-50 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
          <h1 className="pt-8 pb-6 font-bold text-orange-500 text-4xl text-center cursor-default">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2  text-black-400 text-lg">Name</label>
              <input
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-black-400 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="enter your name"
              />
            </div>
            {errors.name && touched.name && (
              <p className="text-red-600">{errors.name}</p>
            )}
            <div>
              <label className="mb-2   text-black-400 text-lg">Email</label>
              <input
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-black-400 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="enter your email"
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-600">{errors.email}</p>
            )}
            <div>
              <label className="mb-2   text-black-400 text-lg">
                Phone Number
              </label>
              <input
                id="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-black-400 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="text"
                placeholder="enter your phone number"
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="text-red-600">{errors.phone}</p>
            )}
            <div>
              <label className="mb-2   text-black-400 text-lg">Password</label>
              <input
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-black-400 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="enter the password"
              />
            </div>
            {errors.password && touched.password && (
              <p className="text-red-600">{errors.password}</p>
            )}

            <div>
              <label className="mb-2   text-black-400 text-lg">
                Confirm Password
              </label>
              <input
                id="cpassword"
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-black-400 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="re-enter the password"
              />
            </div>
            {errors.cpassword && touched.cpassword && (
              <p className="text-red-600">{errors.cpassword}</p>
            )}
            <button
              disabled={isSubmitting}
              className="bg-orange-500 text-gray-300  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SIGN UP
            </button>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="text-black-300">
              already have an account?
              <Link
                to="/owner/auth/login"
                className="group text-blue-600 transition-all duration-100 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-blue-700 to-orange-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Sign In
                </span>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
