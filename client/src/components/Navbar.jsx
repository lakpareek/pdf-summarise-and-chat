import { FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { SidebarToggleContext } from '../context/SidebarToggleContext'
import MenuToggleBar from "./MenuToggleBar";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      className={`bg-[#303030] flex justify-between transition-all duration-700 ml-0`}
    >
      <MenuToggleBar/>
      

      <div className="flex items-center">
        <div className="relative">
          <button
            className="text-[#ECECEC] group bg-transparent"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="w-6 h-6 mt-1 cursor-pointer" />
          </button>

          <div
            className={`z-10 absolute right-0 top-full mt-2 bg-[#ECECEC] text-sm text-gray-950 rounded-lg shadow-md transition-opacity duration-300 ${
              dropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ transitionDelay: dropdownOpen ? "0s" : "0.2s" }}
          >
            <ul className="py-2">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
