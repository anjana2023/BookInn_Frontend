import Navbar from "../../components/user/NavBar/Navbar";
import ProfileSidebar from "../../components/user/ProfileSidebar";
import { Outlet } from "react-router-dom";
import BookingsListPage from "../../components/user/Bookings";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-row flex-grow">
        <ProfileSidebar />
        <main className="flex-grow p-6 bg-gray-100">
          <BookingsListPage />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
