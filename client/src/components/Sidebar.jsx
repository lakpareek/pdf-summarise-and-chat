import React from "react";
import {
  FaCog,
  FaHome,
  FaPoll,
  FaRegEnvelope,
  FaRegFileAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { SidebarToggleContext } from '../context/SidebarToggleContext'
import MenuToggleBar from "./MenuToggleBar";


//DUMMY DATA STARTS
const pdfNames = ["Notes.pdf", "All Things Encyclopediacvxvsvsvs-faefa aff.pdf", "Homo Ecce.pdf", "yes-to-life.pdf"]
//DUMMY DATA ENDS

export default function Sidebar() {
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  return (
    <div className={`${sidebarToggle ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out w-64 bg-[#303030] fixed h-full `}>
      <div className="px-3 py-4">
      <MenuToggleBar/>
      </div>
      <div className="flex justify-center">
      <hr className="w-[75%] border-gray-500"/>
      </div>
      <ul className="mt-3 text-[#ECECEC] text-sm px-3 py-4">
      {pdfNames.map((pdfName, index) => (
          <li
            key={index}
            className="mb-2 rounded hover:shadow hover:bg-[#3A3A3A] py-2"
          >
            <a href="#" className="px-3 -ml-3">
              {pdfName}
            </a>
          </li>
        ))}
        
      </ul>
    </div>
  );
}
