import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { LiaWalletSolid } from "react-icons/lia";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <aside
      id="default-sidebar"
      className="  w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 fixed"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-white">
        <ul className="space-y-5 font-medium">
          <li>
            <Link
              to=""
              className="flex  bg-blue- items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <CgProfile fontSize={22} />
              </svg>
              <span className="ms-3">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/bookings"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <TbBrandBooking fontSize={22} />{" "}
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">
                {" "}
                My Bookings
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/bookings"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <LiaWalletSolid fontSize={22} />{" "}
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Wallet</span>
            </Link>
          </li>
          <li>
            <Link
              to=""
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <MdFavoriteBorder fontSize={22} />{" "}
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Saved</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
