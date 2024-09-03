import React, { useState } from "react";
import SideNav from "../components/SideNav.jsx";
import { IoMdMenu } from "react-icons/io";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="flex h-screen">
      <div className={`hidden lg:block w-64 bg-gray-800 text-white`}>
        <SideNav setOpen={setOpen} />
      </div>

      {open && (
        <div className="absolute top-0 left-0 z-20 w-64 h-full bg-gray-800 text-white lg:hidden">
          <SideNav setOpen={setOpen} />
        </div>
      )}

      {!open && (
        <div className="lg:hidden absolute top-10 left-3 z-30">
          <IoMdMenu
            className="h-8 w-8 text-orange cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
