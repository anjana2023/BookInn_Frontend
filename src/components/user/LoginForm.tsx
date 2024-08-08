import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/store";
import { LoginValidation } from "../../utils/validation";
import { USER_API } from "../../constants";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate,useSearchParams } from "react-router-dom";
import showToast from "../../utils/toast";
import { setItemToLocalStorage } from "../../utils/localStorage";
import mal3 from "../../../src/assets/images/mal3.jpg";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { values, touched, handleBlur, handleChange, errors, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidation,
      onSubmit: ({ email, password }) => {
        axios
          .post(USER_API + "/auth/login", { email, password })
          .then(({ data }) => {
            const{ access_token, refresh_token }= data;
            const { name, role, _id } = data.user;
            setItemToLocalStorage('access_token', access_token); 
          setItemToLocalStorage("refresh_token",refresh_token)
            showToast(data.message, "success");
            dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
            const redirection = params.get("redirectPath");
            if (redirection) navigate(-1);
            else navigate("/");
          })
          .catch(({ response }) => {
            showToast(response?.data?.message, "error");
          });
      },
    });

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      const userData = {
        name: data.user.displayName,
        email: data.user.email,
        picture: data.user.photoURL,
        email_verified: data.user.emailVerified,
      };
      axios
        .post(USER_API + "/auth/googleSignIn", userData)
        .then(({ data }) => {
          const { message, access_token,refresh_token } = data;
          const { name, role, _id } = data.user;
          setItemToLocalStorage('access_token', access_token); 
          setItemToLocalStorage("refresh_token",refresh_token)
          showToast(message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
          navigate("/");
        })
        .catch((response) => {
          showToast(response?.data?.message, "error");
        });
    });
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center  bg-zinc-200"
      style={{
        backgroundImage: `url(${mal3})`,
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
              to="/user/auth/forgotPassword"
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
                to="/user/auth/register"
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
