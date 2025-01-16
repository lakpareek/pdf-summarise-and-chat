import React, { useContext } from 'react';
import Message from './Message'
import { SidebarToggleContext } from '../context/SidebarToggleContext'

export default function Chat() {
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  return (
    <div className={`overflow-scroll h-[70.9vh] w-screen flex flex-col items-center pt-2 transition-all duration-300 ${sidebarToggle ? 'ml-64' : ''}`}>
      <div className='w-[48vw]'>
      <div className='flex items-center justify-center'><h2 className=''><a href="#" className='underline'>your-uploaded-file.pdf</a></h2></div>
      <Message/>
      </div>
    </div>
  )
}
