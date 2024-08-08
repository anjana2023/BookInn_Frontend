import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar";
import Navbar from "../../components/admin/Navbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <div className="flex-none  w-screen">
        <Navbar />
      </div>
      <div className="flex flex-grow  overflow-y-auto">
        <div className="flex-none " style={{ width: "20%" }}>
          <Sidebar />
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
