import React from "react";
import { useState, useEffect, useContext } from "react";
import { TbFileUpload } from "react-icons/tb";
import { CurrentConversationContext } from '../context/CurrentConversationContext';
import axios from "axios";


export default function FileUploader() {
  const api_url = import.meta.env.VITE_API_URL;
  const [file, setFile] = useState(null);
  const UploadStatus = {
    IDLE: Symbol('idle'),
    UPLOADING: Symbol('uploading'),
    SUCCESS: Symbol('success'),
    ERROR: Symbol('error'),
  };
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
      setFile(e.target.files[0]);
    }
  }
  async function handleFileUpload() {
    if(!file){
        return;
    }
    setStatus(UploadStatus.UPLOADING);
    const formData = new FormData();
    formData.append("file", file);
    try{
        const result = await axios.post(`${api_url}/pdf/uploadpdf`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
        setStatus(UploadStatus.SUCCESS);
        try{
            const conversation = await axios.get(`${api_url}/chat/conversations`, {
                withCredentials: true
            })
            console.log("Conversations fetched from fileuploader:", conversation.data.conversations);
            const a = conversation.data.conversations[0];
            setCurrentConversation(conversation.data.conversations[0]);
            //console.log(JSON.stringify(a) === JSON.stringify(currentConversation));
            console.log("Conversation set from fileUploader:", currentConversation);
        }catch(error){
            console.error("Error fetching conversation:", error);
        }
        setCurrentConversation()
    }catch(error){
        alert("There was an error uploading your file. Please try again :(");
        setStatus(UploadStatus.ERROR)
    }
  }

  
  return (
    <div>
      <div className="flex  gap-3 sm:items-center h-full w-full flex-col-reverse sm:flex-row ">
      
        {file !== null && status !== UploadStatus.UPLOADING ? <button onClick={handleFileUpload}>
          <TbFileUpload size={40} />
        </button> : null}

        {status === UploadStatus.SUCCESS ? <p>Successfully uploaded</p> : null}
        {status === UploadStatus.ERROR ? <p>There was an error uploading the pdf</p> : null}

        <input
          type="file"
          className="transform scale-75 origin-left"
          onChange={handleFileChange}
        />
        {file && (
          <p>
            {file.name} is the name and type is: {file.type}
          </p>
        )}
      </div>
    </div>
  );
}
