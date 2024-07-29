import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/reducer/reducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store/store";
import { clearOwner } from "../../../redux/slices/ownerSlice";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const owner = useSelector((state: RootState) => state.ownerSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(clearOwner());
    navigate("/owner/auth/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-gray-800 text-white shadow-md lg:px-8 lg:py-4">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          BookInn
        </Link>
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center ${isMenuOpen ? "block" : "hidden"}`}>
            <ul className="flex gap-4">
              <li>
                <Link to="/owner" className="text-orange-500">Home</Link>
              </li>
              {owner.isAuthenticated && owner.role === "owner" && (
                <li className="relative">
                  <button onClick={toggleDropdown} className="flex items-center text-orange-500 focus:outline-none">
                    Profile <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute right-0 w-40 mt-2 bg-white text-gray-700 rounded shadow-lg">
                      <li>
                        <Link to="/owner/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                      </li>
                      <li>
                        <Link to="/owner/chat" className="block px-4 py-2 hover:bg-gray-100">Chat</Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}
              <li>
                <Link to="/owner/AboutUs" className="text-orange-500">About Us</Link>
              </li>
              <li>
                <Link to="/owner/contact" className="text-orange-500">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {owner.isAuthenticated && owner.role === "owner" ? (
              <button onClick={handleLogOut} className="px-4 py-2 bg-blue-300 text-gray-900 uppercase rounded-lg hover:bg-blue-500">
                SIGN OUT
              </button>
            ) : (
              <>
                <Link to="/owner/auth/login" className="px-4 py-2 bg-white text-gray-900 uppercase rounded-lg hover:bg-gray-300">
                  SIGN IN
                </Link>
                <Link to="/owner/auth/register" className="px-4 py-2 bg-white text-gray-900 uppercase rounded-lg hover:bg-gray-300">
                  SIGN UP
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800">
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link to="/owner" className="text-orange-500">Home</Link>
            </li>
            {owner.isAuthenticated && owner.role === "owner" && (
              <>
                <li>
                  <Link to="/owner/profile" className="text-orange-500">Profile</Link>
                </li>
                <li>
                  <Link to="/owner/chat" className="text-orange-500">Chat</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/owner/AboutUs" className="text-orange-500">About Us</Link>
            </li>
            <li>
              <Link to="/owner/contact" className="text-orange-500">Contact Us</Link>
            </li>
            {owner.isAuthenticated && owner.role === "owner" ? (
              <li>
                <button onClick={handleLogOut} className="w-full px-4 py-2 bg-orange-400 text-gray-900 uppercase rounded-lg hover:bg-blue-500">
                  SIGN OUT
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/owner/auth/login" className="block px-4 py-2 bg-white text-gray-900 uppercase rounded-lg hover:bg-gray-300">
                    SIGN IN
                  </Link>
                </li>
                <li>
                  <Link to="/owner/auth/register" className="block px-4 py-2 bg-white text-gray-900 uppercase rounded-lg hover:bg-gray-300">
                    SIGN UP
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
