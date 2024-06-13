import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/store";
import { LoginValidation } from "../../utils/validation";
import { OWNER_API } from "../../constants";
import { setOwner } from "../../redux/slices/ownerSlice";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/toast";
import { setItemToLocalStorage } from "../../utils/localStorage";

import owner2 from "../../../src/assets/images/owner2.jpg";

const LoginForm: React.FC = () => {
  console.log("login fom owner");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, touched, handleBlur, handleChange, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidation,
      onSubmit: ({ email, password }) => {
        axios
          .post(OWNER_API + "/auth/login", { email, password })
          .then(({ data }) => {
            console.log(data);
            console.log(data);
            console.log(data);

            const access_token = data.accessToken;
            console.log(access_token);
         
            const { name, role, _id } = data.owner;
            console.log(name);
            console.log(role);
            console.log(_id);

            localStorage.setItem("access_token", access_token);
            showToast(data.message, "success");
            dispatch(setOwner({ isAuthenticated: true, name, role, id: _id }));
            navigate("/owner");
          })
          .catch(({ response }) => {
            console.log(response);
            showToast(response?.data?.message, "error");
          });
      },
    });

  const handleGoogleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        const user = userCredential.user;
        const ownerData = {
          ownerName: user.displayName,
          email: user.email,
          picture: user.photoURL,
          email_verified: user.emailVerified,
          role: "role", // You might need to adjust this value based on your logic
        };
        axios
          .post(OWNER_API + "/auth/googleSignIn", { owner: ownerData })
          .then(({ data }) => {
            const { message, accessToken } = data;
            const { name, role, _id } = data.owner;
            setItemToLocalStorage("access_token", accessToken);
            showToast(message, "success");
            dispatch(setOwner({ isAuthenticated: true, name, role, id: _id }));
            navigate("/owner");
          })
          .catch((error) => {
            console.log(error);
            showToast(error?.response?.data?.message, "error");
          });
      })
      .catch((error) => {
        console.log(error);
        showToast(error.message, "error");
      });
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center  bg-zinc-200"
      style={{
        backgroundImage: `url(${owner2})`, // Replace 'path_to_your_image' with the actual path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid gap-8 bg-opacity-90">
        <div className="border-[10px] border-transparent rounded-[20px] bg-gray-100 bg-opacity-20 shadow-lg xl:p-5 2xl:p-5 lg:p-5 md:p-5 sm:p-2 ">
          <h1 className="pt-8 pb-6 font-bold text-blue-700 text-4xl text-center cursor-default">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2  text-white text-lg">Email</label>
              <input
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2  text-blue-600 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-600">{errors.email}</p>
            )}
            <div>
              <label className="mb-2 text-white text-lg">Password</label>
              <input
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border p-2  text-blue-800 border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="password"
                placeholder="Password"
              />
            </div>
            {errors.password && touched.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
            <Link
              to="/owner/forgotPassword"
              className="group text-blue-800 transition-all duration-100 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-500 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Forget your password?
              </span>
            </Link>
            <button
              className="bg-blue-600 text-gray-300  shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              type="submit"
            >
              SIGN IN
            </button>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="text-black-300">
              Don't have an account?
              <Link
                to="/owner/auth/register"
                className="group text-blue-700 transition-all duration-100 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Sign Up
                </span>
              </Link>
            </h3>
          </div>

          <div
            id="third-party-auth"
            className="flex items-center justify-center mt-5 flex-wrap"
          >
            <button
              onClick={handleGoogleSignIn}
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
            >
           

              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                alt="Google"
              />
            </button>
          </div>

          <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
            <p className="cursor-default">
              By signing in, you agree to our
              <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Terms
                </span>
              </a>
              and
              <a className="group text-blue-400 transition-all duration-100 ease-in-out">
                <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Privacy Policy
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
