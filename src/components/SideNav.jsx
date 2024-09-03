import React, { useState } from "react";
import { TbTimelineEventText, TbCalendarUser } from "react-icons/tb";
import {
  MdDoneOutline,
  MdOutlineEditCalendar,
  MdDashboard,
} from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

import { AiOutlineLogout } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice";

const SideNav = ({ setOpen }) => {
  const userData = useSelector((state) => state.user.user)?.user;
  const [user, setUser] = useState(userData || null);
  const dispatch = useDispatch();
  const loc = window.location.pathname.split("/")[2] || "overview"; 
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUser());
    setUser(null);
    alert("Logout successful");
  };

  const handleItemClick = (key) => {
    if (key === "events") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/${key === "overview" ? "" : key}`);
    }
  };

  const getInitials = () => {
    if (!user) return "";
    const name = user?.fullName;
    const names = name.split(" ");
    const firstLetters = names.map((word) => word.charAt(0));
    return firstLetters.slice(0, 2).join("").toUpperCase();
  };

  const navItems = [
    { label: "Overview", key: "",id :1, icon: <MdDashboard /> },
    {
      label: "Events",
      key: "/",
      id :2,
      icon: <TbTimelineEventText />,
      children: [
        {
          label: "Create Event",
          key: "new-event",
          id:2.1,
          icon: <MdOutlineEditCalendar />,
        },

        { label: "My Events", key: "my-events",id:2.2, icon: <TbCalendarUser /> },
        {
          label: "Registered Events",
          key: "registered-events",
          id:2.3,
          icon: <MdDoneOutline />,
        },
      ],
    },
  ];

  return (
    <div
      className={`sidenav ${
        open ? "open" : "closed"
      } absolute z-50 bg-[#1a1a1a] text-white w-64 h-full`}
    >
      <div className="min-h-[86vh] p-4">
        <div className="brand mt-6 mb-6 flex items-center justify-between">
          <Link to="/" className="text-2xl text-orange">
            Event Management
          </Link>

          <button className="block lg:hidden" onClick={() => setOpen(false)}>
            <IoMdMenu className="text-white block w-8 h-8" />
          </button>
        </div>
        <hr />

        <nav className="mt-4">
          {navItems.map((item, i) => (
            <div key={item.id} className="mb-1">
              <Link
                className={`flex items-center w-full p-3 text-left hover:bg-orange-600 rounded ${
                  loc === item.key ? "bg-orange-600" : ""
                }`}
                to={`/dashboard${item.key}`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>

              {item.children && (
                <div className="ml-4">
                  {item.children.map((child) => (
                    <Link
                      to={`/dashboard/${child.key}`} key={child.id}
                      className={`flex items-center w-full p-2 text-left hover:bg-orange-600 rounded ${
                        loc === child.key ? "bg-orange-600" : ""
                      }`}
                      onClick={() => handleItemClick(child.key)}
                    >
                      {child.icon}
                      <span className="ml-2">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            className={`flex items-center w-full p-3 text-left hover:bg-orange-600 rounded
              `}
            onClick={handleLogout}
          >
            <AiOutlineLogout />
            <span className="ml-2">Logout</span>
          </button>
        </nav>
      </div>

      <hr />
      <div className="grid   grid-flow-col text-white ml-4 mt-4 cursor-pointer">
        <span className="mt-2 font-bold">
          <span className="text-sm mr-3  bg-red-700 p-3 rounded-full">
            {getInitials()}
          </span>
        </span>
        <br />
        <span className="mr-2 py-1 leading-4">
          <span className="text-nowrap">{user?.fullName}</span>
          <br />
          <span className="text-xs">{user?.email}</span>
        </span>
      </div>
    </div>
  );
};

export default SideNav;
