import React, { useContext, useEffect } from 'react';
import Message from './Message'
import { SidebarToggleContext } from '../context/SidebarToggleContext'
import { CurrentConversationContext } from "../context/CurrentConversationContext";


export default function Chat() {
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  const { currentConversation } = useContext(CurrentConversationContext);
  return (
    <div className={`overflow-scroll h-[70.9vh] w-screen flex flex-col items-center pt-2 transition-all duration-300 ${sidebarToggle ? 'ml-64' : ''}`}>
      <div className='w-[48vw]'>
      <div className='flex items-center justify-center'><h2 className=''><a href={currentConversation ? currentConversation.cloudinary_url : "#"} className='underline'>{currentConversation ? currentConversation.pdf_title : ""}</a></h2></div>
      <Message/>
      </div>
    </div>
  )
}
