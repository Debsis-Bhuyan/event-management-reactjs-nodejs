import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaAlignJustify, FaTimes, FaUser, FaChevronDown } from "react-icons/fa";
import { links } from "../data/links";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../store/userSlice.js";
import Logo  from "../assets/logoHyS.png";


const Header = () => {
  const userInfo = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(userInfo?.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const getInitials = () => {
    if (!user) return "";
    const name = user?.fullName;
    const names = name.split(" ");
    const firstLetters = names.map((word) => word.charAt(0));
    const initials = firstLetters.slice(0, 2).join("");
    return initials.toUpperCase();
  };

  const handleLogout = () => {
    dispatch(clearUser());
    setUser(null);
    alert("Logout successful");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`w-full fixed top-0 left-0 z-20 bg-[#050816] ${
        scrolled ? "bg-[#050816]" : " lg:bg-transparent"
      }  ${open ? "bg-[#050816] lg:bg-transparent" : " "}`}
    >
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor- flex items-center gap-1 text-white hover:text-red-600"
          
        >
          <Link to={"/"} className="flex items-center justify-between gap-2"> 
          <img src={Logo} alt="" className="rounded h-12" />
          <span> Events</span>
          </Link>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <FaTimes color="#fff" /> : <FaAlignJustify color="#fff" />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in text-white ${
            open ? "top-12" : "top-[-490px]"
          } ${open ? "bg-[#050816] lg:bg-transparent " : " bg-transparent"}`}
        >
          {links.map((link) => (
            <li
              key={`${link.name}`}
              className="md:ml-8 md:my-0 my-8 font-semibold flex capitalize lg:text-white-100 gap-4 lg:pr-20 items-center "
            >
              <link.icon />
              <Link
                to={link.link}
                className={`hover:text-red-400 duration-500 ${
                  location.pathname === link.link ? "text-orange-500" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <div>
            {userInfo?.token ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="border-none text-orange hover:text-red-400 duration-500 bg-transparent text-xl flex items-center"
                >
                  <span className="text-sm mr-2 bg-red-700 p-2 rounded-full font-bold">
                    {getInitials()}
                  </span>
                  {user?.fullName}
                  <FaChevronDown className="ml-2" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-20">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center font-semibold gap-2">
                <FaUser />
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
