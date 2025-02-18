import { FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarToggleContext } from '../context/SidebarToggleContext';
import { AuthContext } from "../context/AuthContext";
import MenuToggleBar from "./MenuToggleBar";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const log_out = async (e) => {
    e.preventDefault();
    await logout(); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-[#303030] flex justify-between transition-all duration-700 ml-0 px-3 py-3">
      <MenuToggleBar />
      <div className="flex items-center">
        <div className="relative">
          <button className="text-[#ECECEC] group bg-transparent" onClick={toggleDropdown}>
            <FaUserCircle className="w-6 h-6 mt-1 cursor-pointer" />
          </button>

          <div
            className={`z-10 w-auto absolute right-0 top-full mt-2 bg-[#ECECEC] text-sm text-gray-950 rounded-lg shadow-md transition-opacity duration-300 ${
              dropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ transitionDelay: dropdownOpen ? "0s" : "0.2s" }}
          >
            <ul className="py-2 w-max flex flex-col items-center justify-center">
              <li>
                <p className="block px-4 py-2">
                  Hello, {user?.fullname || "User"} 
                </p>
              </li>
              <li>
                <button onClick={log_out} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
