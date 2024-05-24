import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/reducer/reducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store/store";
import { clearOwner } from "../../../redux/slices/ownerSlice";
import React from "react";

const Navbar = () => {
  const owner = useSelector((state: RootState) => state.ownerSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(clearOwner());
    navigate("/owner/auth/login");
  };
  return (
    <nav className="sticky top-0 z-10 block w-full max-w-full ps-8 py-2 text-white bg-gray-800 rounded-none shadow-md h-max bg-opacity-100 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-white-gray-900">
        <Link
          to="#"
          className="mr-4 block cursor-pointer py-1.5 text-2xl font-bold text-base font-head leading-relaxed text-orange-500"
        >
          BookInn
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans font-semibold text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <Link
                  to="/owner/pages"
                  className=" flex items-center text-orange-500"
                >
                  {" "}
                  {/* Change color here */}
                  About Us
                </Link>
              </li>

              <li className="block p-1 font-sans font-semibold text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <Link
                  to="/owner/docs"
                  className="flex items-center text-orange-500"
                >
                  {" "}
                  {/* Change color here */}
                  Contact Us
                </Link>
              </li>
              {owner.isAuthenticated && owner.role === "owner" && (
                <li className="block p-1 font-sans font-semibold text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  <Link
                    to="/owner/profile"
                    className="flex items-center text-orange-500"
                  >
                    {" "}
                    {/* Change color here */}
                    Profile
                  </Link>
                </li>
              )}
              <li className="block p-1 font-sans font-semibold text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <Link
                  to="/owner"
                  className=" flex items-center text-orange-500"
                >
                  {" "}
                  {/* Change color here */}
                  Home
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-x-1">
            {owner.isAuthenticated && owner.role === "owner" ? (
              <button
                onClick={handleLogOut}
                className="hidden px-4 py-2 font-sans text-xs bg-blue-300 font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-500 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                type="button"
              >
                <span className="text-orange-500">SIGN OUT</span>{" "}
                {/* Change color here */}
              </button>
            ) : (
              <>
                <Link
                  to="/owner/auth/login"
                  className="hidden px-4 py-2 font-sans text-xs bg-white font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-300 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                >
                  <span className="text-orange-500">SIGN IN</span>{" "}
                  {/* Change color here */}
                </Link>
                <Link
                  to="/owner/auth/register"
                  className="hidden px-4 py-2 font-sans text-xs bg-white font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-300 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                  type="button"
                >
                  <span className="text-orange-500">SIGN UP</span>{" "}
                  {/* Change color here */}
                </Link>
              </>
            )}
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
