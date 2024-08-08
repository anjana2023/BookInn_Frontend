import { CgProfile } from "react-icons/cg";
import { LiaWalletSolid } from "react-icons/lia";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <aside
      id="default-sidebar"
      className="w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white"
      aria-label="Sidebar"
      style={{
        boxShadow:
          "0 10px 15px -3px rgba(107, 114, 128, 0.7), 0 4px 6px -2px rgba(107, 114, 128, 0.7)",
      }}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-5 font-medium">
          <li>
            <Link
              to="/user/profile"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
            >
              <CgProfile
                fontSize={22}
                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
              />
              <span className="ms-3">Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/bookings"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
            >
              <TbBrandBooking
                fontSize={22}
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">My Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/wallet"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-400 group"
            >
              <LiaWalletSolid
                fontSize={22}
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Wallet</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
