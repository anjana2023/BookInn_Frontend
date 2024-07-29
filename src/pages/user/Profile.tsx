import React from "react";
import Navbar from "../../components/user/NavBar/Navbar";
import ProfileSidebar from "../../components/user/ProfileSidebar";
import { Outlet } from "react-router-dom";
import UserProfile from "../../components/user/UserProfile";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex flex-row">
        <ProfileSidebar />
        <main className="flex-grow bg-white">
          <UserProfile />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
