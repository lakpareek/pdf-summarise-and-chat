import React, { useContext, useState, useEffect } from 'react';
import { SidebarToggleContext } from '../context/SidebarToggleContext';
import { CurrentConversationContext } from '../context/CurrentConversationContext';
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import axios from 'axios';


export default function QueryBox() {
  const { sidebarToggle } = useContext(SidebarToggleContext);
  const { currentConversation } = useContext(CurrentConversationContext);
  const [message, setMessage] = useState("");
  const api_url = import.meta.env.VITE_API_URL;

  const isEmptyConversation = !currentConversation || Object.keys(currentConversation).length === 0;

  const handleSendMessage = async() => {
    if (message.trim() === "") return;
    try {
      const result = await axios.post(`${api_url}/chat/send/${currentConversation.conversation_id}`, {
        message: message,
      }, { withCredentials: true });
      setMessage("");
      console.log("Message Sent:", message);
    } catch(error) {
      console.error("Error sending message:", error);
    }
     // Clear input after sending
  };
  useEffect(() => {
    setMessage("");
  }, [currentConversation]);

  return (
    <div className='absolute -bottom-0 flex justify-center w-screen h-[22vh]'>
      <div className={`bg-[#2F2F2F] rounded-3xl w-[48vw] h-[18vh] p-3 flex items-center transition-all duration-300 ${sidebarToggle ? 'ml-64' : ''}`}>
        {isEmptyConversation ? (
          // Show File Upload if No Conversation Exists
          <label htmlFor='file-upload' className='flex flex-row gap-4 cursor-pointer text-white'>
            <FaFileCirclePlus size={40} />
            <span className='relative top-2'>Upload/Drag and Drop the PDF you need summarized</span>
          </label>
        ) : (
          // Show Textbox when a Conversation Exists
          <div className="flex w-full h-full px-4 items-center">
            <textarea
              className="w-full h-full bg-transparent text-white  px-4 py-2 outline-none resize-none overflow-y-auto"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault(); // Prevent new line on Enter
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
        <input id='file-upload' type='file' accept='.pdf' className='hidden' />
      </div>
    </div>
  );
}
