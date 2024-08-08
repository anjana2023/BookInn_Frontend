import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/store";
import { clearUser } from "../../redux/slices/userSlice";
import showToast from "../../utils/toast";
import {
  HiOutlineLogout,
  HiOutlineViewGrid,
  HiOutlineUserGroup,
  HiOutlineHome,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    showToast("Logout success", "success");
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white  rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Open"} Menu
      </button>
      <div
        className={`fixed top-0 left-0 bg-gray-800 text-white w-64 h-full flex flex-col py-4 px-6 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-3xl font-bold mb-8">BookInn</h1>
        <ul className="space-y-4 mt-16">
          <li>
            <Link
              to="/admin"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700"
            >
              <HiOutlineViewGrid className="mr-2 text-xl" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700"
            >
              <HiOutlineUserGroup className="mr-2 text-xl" />
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/owners"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700"
            >
              <HiOutlineUserGroup className="mr-2 text-xl" />
              Owners
            </Link>
          </li>
          <li>
            <Link
              to="/admin/hotels"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700"
            >
              <HiOutlineHome className="mr-2 text-xl" />
              Hotels
            </Link>
          </li>
          <li>
            <Link
              to="/admin/verified_hotels"
              className="flex items-center py-2 px-4 rounded-md hover:bg-gray-700"
            >
              <HiOutlineCheckCircle className="mr-2 text-xl" />
              Verified Hotels
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 text-white rounded-md py-2 px-4 space-x-2"
            >
              <HiOutlineLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
