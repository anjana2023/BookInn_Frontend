import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProfileSidebar: React.FC = () => {
  return (
    <aside
      id="default-sidebar"
      className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 fixed bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-5 font-medium">
          <li>
            <Link
              to="/owner/profile"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
            >
              <CgProfile className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white" />
              <span className="ml-3">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/owner/hotels"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
            >
              <TbBrandBooking className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white" />
              <span className="ml-3">My Hotels</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
            >
              <LiaWalletSolid className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white" />
              <span className="ml-3">Bookings</span>
            </Link>
          </li>
          {/* Uncomment and update the following section if needed */}
          {/* <li>
            <Link
              to="/"
              className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
            >
              <MdFavoriteBorder className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white" />
              <span className="ml-3">Favorites</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
