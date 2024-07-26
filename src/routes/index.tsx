import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ProtectedAdminRoute,
  ProtectedOwnerRoute,
  ProtectedUserRoute,
} from "./protectedRoutes";
import { PublicOwnerRoutes, PublicRoutes } from "./publicRoutes";
import React from "react";
import AddHotel from "../pages/owner/AddHotel";
import HotelDetails from "../pages/user/HotelDetails";
import OwnerHotels from "../pages/owner/ownerHotels";
import EditHotel from "../pages/owner/EditHotel";


const Register = lazy(() => import("../pages/user/Register"));
const Login = lazy(() => import("../pages/user/Login"));
const VerifyOtp = lazy(() => import("../pages/user/verifyOt"));
const Home = lazy(() => import("../pages/Home"));
const HotelCards=lazy(()=>import("../pages/user/Hotell"))
const Forgotpassword = lazy(() => import("../pages/user/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/user/ResetPassword"));
const UserProfile = lazy(() => import("../pages/user/Profile"));
const AboutUs =lazy(()=>import('../pages/user/Aboutus'))
const About =lazy(()=>import('../pages/owner/About'))
const ContactSection=lazy(()=>import('../pages/user/ContanctUs'))

const CheckoutPage= lazy(()=>import("../pages/user/checkout"))
const PaymentCompleted = lazy(() => import("../components/user/paymentCompleted"));
const BookingDetails= lazy(()=>import ("../pages/user/BookingDetail"))
const BookingDetail= lazy(()=>import ("../pages/owner/BookingDetails"))
const Contact=lazy(()=>import('../pages/owner/contact'))
const NotFound=lazy(()=>import("../pages/404"))


const BookingList = lazy(()=>import("../pages/user/Bookings"))
const Wallets = lazy(()=>import("../pages/user/wallet"));
const Chat = lazy(() => import("../pages/user/chat"));
const Transaction = lazy(()=>import("../pages/user/walletTransaction"));


const OwnerRegister = lazy(() => import("../components/owner/ownerRegister"));
const OwnerLogin = lazy(() => import("../components/owner/ownerLogin"));
const OwnerVerifyOtp = lazy(() => import("../components/owner/ownerOtp"));
const OwnerHome = lazy(() => import("../pages/owner/Home"));
const OwnerHotelDetails=lazy(()=>import("../pages/owner/ownerHotelDetails"))
const AddRoom =lazy(()=>import("../pages/owner/AddRoom"))
const OwnerChat=lazy(()=>import("../pages/owner/chat"));
const Bookings=lazy(()=>import("../pages/owner/Bookings"))

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
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/user/contact" element={<ContactSection />} />
          <Route path="/user/hotelDetails/:id" element={<HotelDetails />} />
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
            <Route path="/user/hotels" element={<HotelCards />} />
            <Route path="/user/checkout/:id" element={<CheckoutPage />} />
            <Route path="/user/chat" element={<Chat />} />
            <Route path="/payment_status/:id" element={<PaymentCompleted />} />
            <Route path ="/user/bookings" element={<BookingList/>}/>
            <Route path="/user/wallet" element={<Wallets/>}/>
            <Route path="/user/walletHistory" element={<Transaction/>}/>
            <Route path="/bookingdetails/:id" element={<BookingDetails/>} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>


          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/owner/contact" element={<Contact />} />
          <Route path="/owner/AboutUs" element={<About />} />
          <Route path="" element={<PublicOwnerRoutes />}>
            <Route path="/owner/auth/register" element={<OwnerRegister />} />
            <Route path="/owner/auth/login" element={<OwnerLogin />} />
            <Route path="/owner/auth/verifyOtp" element={<OwnerVerifyOtp />} />
          </Route>
       
          <Route path="" element={<ProtectedOwnerRoute />}>
            <Route path="/owner" element={<OwnerHome />} />
            <Route path="/owner/addhotel" element={<AddHotel />} />
            <Route path="/owner/addRoom" element={<AddRoom/>} />
            <Route path="/owner/bookings" element={<Bookings />} />
            <Route path="/owner/hotels" element={<OwnerHotels />} />
            <Route path="/owner/hotelDetails/:id" element={<OwnerHotelDetails />} />
            <Route path="/owner/bookingdetails/:id" element={<BookingDetail />} />
            <Route path="/owner/chat" element={<OwnerChat/>}/>
            <Route path="/owner/editHotel/:id" element={<EditHotel/>} key={document.location.href}/>
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
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Suspense>
    </>
  );
};
