import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../components/owner/ProfileSidebar";
import Navbar from "../../components/owner/Navbar/Navbar";
import React from "react";
import OwnerProfile from "../../components/owner/ownerProfile";


const Profile = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-row gap-2">
        <ProfileSidebar />
        <main className="flex-grow p-6">
        <OwnerProfile/>
        <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
