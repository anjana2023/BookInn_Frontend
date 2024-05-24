import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ProtectedAdminRoute,
  ProtectedOwnerRoute,
  ProtectedUserRoute,
} from "./protectedRoutes";
import { PublicRoutes } from "./publicRoutes";
import React from "react";
import AddHotel from "../pages/owner/AddHotel";
import HotelDetails from "../pages/user/HotelDetails";
import OwnerHotels from "../pages/owner/ownerHotels";


const Register = lazy(() => import("../pages/user/Register"));
const Login = lazy(() => import("../pages/user/Login"));
const VerifyOtp = lazy(() => import("../pages/user/verifyOt"));
const Home = lazy(() => import("../pages/Home"));
const Forgotpassword = lazy(() => import("../pages/user/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/user/ResetPassword"));
const UserProfile = lazy(() => import("../pages/user/Profile"));

const OwnerRegister = lazy(() => import("../components/owner/ownerRegister"));
const OwnerLogin = lazy(() => import("../components/owner/ownerLogin"));
const OwnerVerifyOtp = lazy(() => import("../components/owner/ownerOtp"));
const OwnerHome = lazy(() => import("../pages/owner/Home"));
const OwnerHotelDetails=lazy(()=>import("../pages/owner/ownerHotelDetails"))


const AdminLogin = lazy(() => import("../pages/admin/Login"));
const AdminDashboard = lazy(() => import("../components/admin/DashBoard"));
const Layout = lazy(() => import("../pages/admin/Layout"));
const UserList = lazy(() => import("../components/admin/users"));
const OwnerList = lazy(() => import("../components/admin/owners"));
const OwnerProfile = lazy(() => import("../pages/owner/ownerProfile"));
const Hotels =lazy(()=>import ("../components/admin/Hotels"))
const Verified_hotels =lazy(()=>import ("../components/admin/HotelData"))
const AdminHotel=lazy(()=>import("../components/admin/HotelDetailss"))
const VerificationHotel=lazy(()=>import("../components/admin/hotelVerification"))

export const MainRouter = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="" element={<PublicRoutes />}>
            <Route path="/user/auth/register" element={<Register />} />
            <Route path="/user/auth/login" element={<Login />} />
            <Route path="/user/auth/verifyOtp" element={<VerifyOtp />} />
            <Route
              path="/user/auth/forgotPassword"
              element={<Forgotpassword />}
            />
            <Route
              path="/user/auth/reset_password/:id"
              element={<ResetPassword />}
            />
          </Route>

          <Route path="/" element={<ProtectedUserRoute />}>
            <Route path="/" element={<Home />} /> 
            <Route path="/user/hotelDetails/:id" element={<HotelDetails />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>

          <Route path="/owner" element={<OwnerHome />} />
          <Route path="" element={<PublicRoutes />}>
            <Route path="/owner/auth/register" element={<OwnerRegister />} />
            <Route path="/owner/auth/login" element={<OwnerLogin />} />
            <Route path="/owner/auth/verifyOtp" element={<OwnerVerifyOtp />} />
          </Route>

          <Route path="" element={<ProtectedOwnerRoute />}>
            <Route path="/owner" element={<OwnerHome />} />
            <Route path="/owner/addhotel" element={<AddHotel />} />
            <Route path="/owner/hotels" element={<OwnerHotels />} />
            <Route path="/owner/hotelDetails/:id" element={<OwnerHotelDetails />} />
            <Route path="/owner/profile" element={<OwnerProfile />} />
          </Route>

          {/******************* Admin routes *****************/}
          <Route path="" element={<PublicRoutes />}>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
          {/* admin protected Route  */}
          <Route path="" element={<ProtectedAdminRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/owners" element={<OwnerList />} />
              <Route path="/admin/hotels" element={<Hotels />} />
              <Route path="/admin/verified_hotels" element={<Verified_hotels/>} />
              <Route path="/admin/hotelDetails/:id" element={<AdminHotel />} />
              <Route path="/admin/hotels/:id/verification" element={<VerificationHotel/>}/>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
