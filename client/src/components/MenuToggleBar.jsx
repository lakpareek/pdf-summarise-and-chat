import React from 'react'
import { SidebarToggleContext } from '../context/SidebarToggleContext'
import { FaBars } from "react-icons/fa";
import { useState, useContext } from "react";

export default function MenuToggleBar() {
    const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  return (
    <div className="flex items-center text-xl">
        <FaBars
          className="text-[#ECECEC] me-4 cursor-pointer transition-transform duration-700"
          onClick={() => setSidebarToggle(!sidebarToggle)}
        />
        <span className="text-[#ECECEC] font-semibold prevent-select">PDF Summarizer</span>
    </div>
  )
}
