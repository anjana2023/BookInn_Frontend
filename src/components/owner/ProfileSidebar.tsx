import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LiaWalletSolid } from "react-icons/lia";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProfileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="sm:hidden p-2 text-white bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      <aside
        id="default-sidebar"
        className={`w-64 h-screen transition-transform sm:translate-x-0 fixed bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
                to="/owner/bookings"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
              >
                <LiaWalletSolid className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white" />
                <span className="ml-3">Bookings</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default ProfileSidebar;
