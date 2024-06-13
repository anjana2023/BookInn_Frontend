import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store/store";
import { clearUser } from "../../redux/slices/userSlice";
import showToast from "../../utils/toast";
import { HiOutlineLogout } from "react-icons/hi";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    showToast("Logout success", "success");
    navigate("/admin/login");
  };

  return (
    <div className="fixed top-0 left-0 bg-gray-800 text-white w-64 h-full flex flex-col py-4 px-6">
     <h1 className="text-3xl font-bold  mb-8">BookInn</h1>
      <ul className="space-y-4 mt-16"> {/* Added mt-16 for top margin */}
        <li>
          <Link
            to="/admin"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/owners"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Owners
          </Link>
        </li>
        <li>
          <Link
            to="/admin/hotels"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Hotels
          </Link>
        </li>
        <li>
          <Link
            to="/admin/verified_hotels"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Verified Hotels
          </Link>
        </li>
        <li>
          <Link
            to="/admin/bookings"
            className="block py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Bookings
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
  );
};

export default Sidebar;
