import React from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import showToast from "../../utils/toast";
import axios from "axios";
import { passwordValidation } from "../../utils/validation";
import { USER_API } from "../../constants";
import mal3 from "../../../src/assets/images/mal3.jpg";
const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: passwordValidation,
    onSubmit: ({ password }) => {
      axios
        .post(USER_API + `/auth/reset_password/${id}`, { password })
        .then(({ data }) => {
          showToast(data.message, "success");
          navigate("/user/auth/login");
        })
        .catch((error) => {
          showToast(error.message, "error");
        });
    },
  });

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${mal3})`, // Adjust the path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid gap-8 ">
        <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100 bg-opacity-50 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
          <h1 className="pt-8 pb-5 font-bold text-blue-800 text-4xl text-center cursor-default">
            Please enter your email address
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 text-white text-lg">Password</label>
              <input
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-blue-600 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="enter the password"
              />
            </div>
            {errors.password && touched.password && (
              <p className="text-red-600">{errors.password}</p>
            )}

            <div>
              <label className="mb-2 text-white text-lg">
                Confirm Password
              </label>
              <input
                id="cpassword"
                value={values.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2 text-gray-300 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="re-enter the password"
              />
            </div>
            {errors.cpassword && touched.cpassword && (
              <p className="text-red-600">{errors.cpassword}</p>
            )}
            <button
              disabled={isSubmitting}
              className="bg-blue-600 text-gray-300 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
