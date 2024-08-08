import Navbar from "../../components/user/NavBar/Navbar";
import ProfileSidebar from "../../components/user/ProfileSidebar";
import { Outlet } from "react-router-dom";
import Wallet from "../../components/user/wallet";

const Profile = () => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex flex-row ">
        <ProfileSidebar />
        <main className="flex-grow p-6">
          <Wallet />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
