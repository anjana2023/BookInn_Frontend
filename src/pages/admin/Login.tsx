import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useAppDispatch } from "../../redux/store/store";
import { LoginValidation } from "../../utils/validation";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/toast";
import { setItemToLocalStorage } from "../../utils/localStorage";
import { ADMIN_API } from "../../constants";

const LoginForm: React.FC = () => {
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
          .post(ADMIN_API + "/login", { email, password })
          .then(({ data }) => {
            const access_token = data.accessToken;
            const { name, role } = data.admin;
            console.log(access_token);
            console.log(name, role);

            setItemToLocalStorage("access_token", access_token);
            showToast(data.message, "success");
            dispatch(setUser({ isAuthenticated: true, name, role }));
            navigate("/admin");
          })
          .catch(({ response }) => {
            console.log(response);
            showToast(response?.data?.message, "error");
          });
      },
    });

  return (
    <div
      style={{
        backgroundImage: `url('./../src/assets/images/adminbg1.avif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px", // Adjust the width as needed
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          ADMIN LOGIN
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              Email
            </label>
            <input
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.email}</p>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "5px",
              }}
            >
              Password
            </label>
            <input
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && touched.password && (
              <p style={{ color: "red", marginTop: "5px" }}>
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
