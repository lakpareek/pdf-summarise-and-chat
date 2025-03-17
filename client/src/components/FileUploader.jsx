import React from "react";
import { useState, useEffect, useContext } from "react";
import { TbFileUpload } from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";
import { CurrentConversationContext } from '../context/CurrentConversationContext';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../axios";

// Define constants outside component to avoid recreating on each render
const UploadStatus = {
  IDLE: 'idle',
  UPLOADING: 'uploading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export default function FileUploader() {
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  const [file, setFile] = useState(null);
  const { currentConversation, setCurrentConversation } = useContext(CurrentConversationContext);
  const [status, setStatus] = useState(UploadStatus.IDLE);
  
  function handleFileChange(e) {
    if (e.target.files) {
      if (e.target.files.length > 1) {
        alert("Please select only one file");
        setFile(null);
        return;
      }
      if (e.target.files[0].type !== "application/pdf") {
        alert("We only accept PDF files for now");
        setFile(null);
        return;
      }
      if (e.target.files[0].size > 5242880) {
        alert("Only files smaller than 5MB are allowed");
        setFile(null);
        return;
      }
      setFile(e.target.files[0]);
    }
  }
  
  async function handleFileUpload() {
    if(!file){
        return;
    }
    //console.log("Starting upload, setting status to UPLOADING");
    setStatus(UploadStatus.UPLOADING);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try{
        //console.log("Sending request to server");
        const result = await axiosInstance.post('/pdf/uploadpdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });        
        
        //console.log("Upload successful, setting status to SUCCESS");
        setStatus(UploadStatus.SUCCESS);
        
        try{
          const conversation = await axiosInstance.get('/chat/conversations');
            //console.log("Conversations fetched from fileuploader:", conversation.data.conversations);
            setCurrentConversation(conversation.data.conversations[0]);
            const a = conversation.data.conversations[0].conversation_id;
            navigate(`/chat/${a}`);
        } catch(error) {
            console.error("Error fetching conversation:", error);
        }
    } catch(error) {
        console.error("Error during upload:", error);
        alert("There was an error uploading your file. Please try again :(");
        setStatus(UploadStatus.ERROR);
    }
  }

  
  return (
    <div>
      <div className="flex gap-3 sm:items-center h-full w-full flex-col-reverse sm:flex-row">
      
        {file !== null && status !== UploadStatus.UPLOADING && (
          <button 
            onClick={handleFileUpload}
            className="text-blue-500 hover:text-blue-700"
          >
            <TbFileUpload size={40} />
          </button>
        )}


        {status === UploadStatus.UPLOADING && (
          <div className="flex items-center">
            <FaSpinner className="animate-spin mr-2 text-blue-500" size={24} />
            <span>Uploading...</span>
          </div>
        )}

        {status === UploadStatus.SUCCESS && <p className="text-green-500">Successfully uploaded</p>}
        {status === UploadStatus.ERROR && <p className="text-red-500">There was an error uploading the pdf</p>}

        <input
          type="file"
          className="transform scale-75 origin-left"
          onChange={handleFileChange}
          disabled={status === UploadStatus.UPLOADING}
        />
        
        {/* {file && (
          <p>
            {file.name} is the name and type is: {file.type}
          </p>
        )} */}
      </div>
    </div>
  );
}