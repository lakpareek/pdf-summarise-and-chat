import React, { useContext } from 'react';
import { SidebarToggleContext } from '../context/SidebarToggleContext'
import { FaFileCirclePlus } from "react-icons/fa6";

export default function QueryBox() {
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  return (
    <div className='absolute -bottom-0 flex justify-center w-screen h-[22vh]'>
      <div className={`bg-[#2F2F2F] rounded-3xl w-[48vw] h-[18vh] pt-3 pl-3 justify-center items-center transition-all duration-300 ${sidebarToggle ? 'ml-64' : ''}`}>
        <label
          htmlFor='file-upload'
          className='flex flex-row gap-4 cursor-pointer text-white'
        >
          <FaFileCirclePlus  size={40} className='' />
          <span className='relative top-2'>Upload/Drag and Drop the PDF you need summarized</span>
        </label>
        <input
          id='file-upload'
          type='file'
          accept='.pdf'
          className='hidden'
        />
      </div>
    </div>
  );
}

