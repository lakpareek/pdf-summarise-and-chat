import React, { useContext, useState, useEffect } from 'react';
import { SidebarToggleContext } from '../context/SidebarToggleContext';
import { CurrentConversationContext } from '../context/CurrentConversationContext';
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { socket } from '../socket';



export default function QueryBox() {
  const { sidebarToggle } = useContext(SidebarToggleContext);
  const { currentConversation, setCurrentConversation } = useContext(CurrentConversationContext);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pdfName, setPdfName] = useState(null);
  const api_url = import.meta.env.VITE_API_URL;


  const isEmptyConversation = !currentConversation || Object.keys(currentConversation).length === 0;


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    setPdfName(file.name);
    setUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post(`${api_url}/pdf/uploadpdf`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the response includes the new conversation details
      const newConversation = await axios.get(`${api_url}/pdf/${response.data.pdf_id}/getconversation`, { withCredentials: true });
      setCurrentConversation(newConversation.conversation.id);
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      const input = document.getElementById('file-upload');
      input.files = e.dataTransfer.files;
      handleFileUpload({ target: input });
    } else {
      alert('Please drop a PDF file');
    }
  };

  const handleSendMessage = async() => {
    if (message.trim() === "") return;
    
    const toSend = message;
    setMessage("");
    try {
      const result = await axios.post(`${api_url}/chat/send/${currentConversation.conversation_id}`, {
        message: toSend,
      }, { withCredentials: true });
      
      console.log("Message Sent:", toSend);
    } catch(error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {
    setMessage("");
    setPdfName(null);
  }, [currentConversation]);

  return (
    <div className='absolute -bottom-0 flex justify-center w-screen h-[22vh]'>
      <div className={`bg-[#2F2F2F] rounded-3xl w-[48vw] h-[18vh] p-3 flex items-center transition-all duration-300 ${sidebarToggle ? 'ml-64' : ''}`}>
      {isEmptyConversation ? (
          <div className="flex flex-col items-center w-full">
            <label 
              htmlFor='file-upload' 
              className='flex flex-row gap-4 cursor-pointer text-white w-full justify-center items-center'
            >
              {uploading ? (
                <span>Uploading...</span>
              ) : pdfName ? (
                <span>Selected: {pdfName}</span> 
              ) : (
                <>
                  <FaFileCirclePlus size={40} />
                  <span className='relative top-2'>Upload/Drag and Drop the PDF you need summarized</span>
                </>
              )}
            </label>
            <input
                type="file"
                id="fileInput"
                // ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
            {pdfName && !uploading && ( 
              <button 
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => document.getElementById('file-upload').click()}
              >
                Send
              </button>
            )}
          </div>
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
        <input id='file-upload' type='file' accept='.pdf' className='hidden' />
      </div>
    </div>
  );
}
