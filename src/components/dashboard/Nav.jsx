import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
   const userData = useSelector((state) => state.user.user)?.user;
  const [user, setUser] = useState(userData || null);
  const firstName = user && user.fullName ? user.fullName.split(" ")[0] : "";

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 ml-4  px-4">
      <div>
        <h2 className="text-2xl font-semibold">
          Welcome, <span className="text-primary capitalize">{firstName}</span>
        </h2>
      </div>

      <div className="relative">
        <Link to={"/dashboard/notification"}>
        <button className="p-3 bg-orange rounded-full text-white hover:bg-red-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
            />
          </svg>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
