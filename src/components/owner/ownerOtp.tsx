import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import showToast from "../../utils/toast";
import { OWNER_API } from "../../constants";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../utils/localStorage";

import owner2 from "../../../src/assets/images/owner2.jpg";

const VerifyOtp: React.FC = () => {
  const [seconds, setSeconds] = useState(60);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: Array.from({ length: 6 }).fill(""),
    },
    onSubmit: (values) => {
      console.log(
        "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      );

      const ownerid = getItemFromLocalStorage("ownerId");
      console.log(
        ownerid,
        "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      );
      const otp = values.otp.join("");
      console.log(otp);
      console.log(otp);
      console.log(otp);

      if (ownerid) {
        axios
          .post(OWNER_API + "/auth/verifyOtp", { otp, ownerid })
          .then(({ data }) => {
            showToast(data.message, "success");
            removeItemFromLocalStorage("ownerId");
            navigate("/owner/auth/login");
          })
          .catch(({ response }) => {
            showToast(response.data.message, "error");
          });
      } else {
        showToast("Something went wrong", "error");
        navigate("/owner/auth/login", { replace: true });
      }
    },
  });
  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const currentInput = inputRef.current[0];
    if (currentInput) {
      currentInput.focus();
      currentInput.addEventListener("paste", pasteText);
      return () => currentInput.removeEventListener("paste", pasteText);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const resendOtp = () => {
    setSeconds(60);
    const ownerId = getItemFromLocalStorage("ownerId");
    if (ownerId) {
      axios
        .post(OWNER_API + "/auth/resendOtp", { ownerId })
        .then(({ data }) => {
          showToast(data.message, "success");
        })
        .catch(({ response }) => {
          showToast(response.data.message, "error");
        });
    }
  };

  const pasteText = (event: ClipboardEvent) => {
    const pastedText = event.clipboardData?.getData("text");
    const newOtp = pastedText
      ?.split("")
      .slice(0, 6)
      .map((char) => char || "");
    formik.setValues((prev: any) => ({
      ...prev,
      otp: newOtp,
    }));
    inputRef.current[5]?.focus();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    const currentOtp = [...formik.values.otp];
    currentOtp[index] = value.slice(-1);
    formik.setValues((prev) => ({
      ...prev,
      otp: currentOtp,
    }));
    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const renderInput = () => {
    return formik.values.otp.map((value, index) => (
      <input
        key={index}
        maxLength={1}
        type="text"
        name={index.toString()}
        value={value as string}
        onKeyUp={(event) => handleBackSpace(event, index)}
        onChange={(event) => handleChange(event, index)}
        className="w-14 h-16 text-center text-medium font-bold text-slate-800 bg-gray-300 border border-transparent hover:border-slate-00 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-700 focus:ring-3 focus:ring-indigo-400"
        pattern="\d*"
        ref={(element) => {
          if (element) {
            inputRef.current[index] = element;
          }
        }}
      />
    ));
  };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${owner2})`, // Replace 'path_to_your_image' with the actual path to your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-lg opacity-70">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Verify OTP</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center space-x-2">{renderInput()}</div>
          <button
            type="submit"
            className="block w-full mt-6 bg-blue-800 text-white font-semibold p-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Verify Account
          </button>
        </form>
        <div className="text-sm text-grey-800 mt-4">
          Didn't receive the code?{" "}
          <button
            className={`underline ${
              seconds === 0
                ? "text-blue-800"
                : "text-blue-800 cursor-not-allowed"
            }`}
            onClick={resendOtp}
            disabled={seconds !== 0}
          >
            Resend OTP{seconds !== 0 && ` (${seconds}s)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
