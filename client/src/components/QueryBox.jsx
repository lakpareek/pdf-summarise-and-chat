import React, { useContext, useState, useEffect } from 'react';
import { SidebarToggleContext } from '../context/SidebarToggleContext';
import { CurrentConversationContext } from '../context/CurrentConversationContext';
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { axiosInstance } from '../axios';
import FileUploader from './FileUploader';



export default function QueryBox() {
  const { sidebarToggle } = useContext(SidebarToggleContext);
  const { currentConversation, setCurrentConversation } = useContext(CurrentConversationContext);
  const [message, setMessage] = useState("");
  const api_url = import.meta.env.VITE_API_URL;


  const isEmptyConversation = !currentConversation || Object.keys(currentConversation).length === 0;




  const handleSendMessage = async() => {
    if (message.trim() === "") return;
    
    const toSend = message;
    setMessage("");
    try {
      const result = await axiosInstance.post(`/chat/send/${currentConversation.conversation_id}`, {
        message: toSend,
      });
      
      
      //("Message Sent:", toSend);
    } catch(error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {
    setMessage("");
  }, [currentConversation]);

  return (
    <div className='absolute -bottom-0 flex justify-center w-screen h-[22vh]'>
      <div className={`bg-[#2F2F2F] rounded-3xl w-[48vw] h-[18vh] p-3 flex items-center transition-all duration-300 ${sidebarToggle ? 'ml-64' : ''}`}>
      {isEmptyConversation ? (
          <FileUploader/>
        ) : (
          // show Textbox when a Conversation Exists
          <div className="flex w-full h-full px-4 items-center">
            <textarea
              className="w-full h-full bg-transparent text-white  px-4 py-2 outline-none resize-none overflow-y-auto"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); 
                  handleSendMessage();
                }
              }}
            />
            <button 
              className="ml-3 bg-white rounded-full text-white p-3 hover:bg-gray-400 transition-all"
              onClick={handleSendMessage}
            >
              <IoSend size={24} color="black"/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
