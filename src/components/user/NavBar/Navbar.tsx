import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store/store";
import { clearUser } from "../../../redux/slices/userSlice";
import logo121 from "../../../assets/images/logo.png";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(clearUser());
    navigate("/user/auth/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow-md lg:px-8 lg:py-4">
      <div className="flex items-center justify-between px-4 py-2 lg:py-0">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo121} alt="BookINN" className="h-10" />
          <span className="text-xl font-medium text-orange-500">BookInn</span>
        </Link>

        <div className="flex items-center lg:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div className={`lg:flex items-center gap-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans font-semibold text-sm text-blue-gray-900">
              <Link to="/" className="flex items-center text-orange-500">
                Home
              </Link>
            </li>
            {user.isAuthenticated && user.role === "user" && (
              <li className="relative block p-1 font-sans font-semibold text-sm text-blue-gray-900">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-orange-500 focus:outline-none"
                >
                  Profile <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 w-40 mt-2 bg-white border rounded shadow-lg">
                    <li>
                      <Link
                        to="/user/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/user/chat"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Chat
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
            <li className="block p-1 font-sans font-semibold text-sm text-blue-gray-900">
              <Link to="/AboutUs" className="flex items-center text-orange-500">
                About Us
              </Link>
            </li>
            <li className="block p-1 font-sans font-semibold text-sm text-blue-gray-900">
              <Link to="/user/contact" className="flex items-center text-orange-500">
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-x-1 mt-4 lg:mt-0">
            {user.isAuthenticated ? (
              <button
                onClick={handleLogOut}
                className="px-4 py-2 font-sans text-xs font-bold text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-blue-400 active:bg-gray-900/20 lg:inline-block"
                type="button"
              >
                <span className="text-orange-500">SIGN OUT</span>
              </button>
            ) : (
              <>
                <Link
                  to="/user/auth/login"
                  className="px-4 py-2 font-sans text-xs bg-white font-bold text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-gray-300 active:bg-gray-900/20 lg:inline-block"
                  type="button"
                >
                  <span className="text-orange-500">SIGN IN</span>
                </Link>
                <Link
                  to="/user/auth/register"
                  className="px-4 py-2 font-sans text-xs bg-white font-bold text-gray-900 uppercase transition-all rounded-lg select-none hover:bg-gray-300 active:bg-gray-900/20 lg:inline-block"
                  type="button"
                >
                  <span className="text-orange-500">SIGN UP</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
