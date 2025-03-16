import React, { useContext, useEffect, useState } from 'react';
import Message from './Message'
import { useParams, useNavigate } from "react-router-dom";

import { SidebarToggleContext } from '../context/SidebarToggleContext'
import { CurrentConversationContext } from "../context/CurrentConversationContext";
import axios from 'axios';



export default function Chat({conversationId}) {
  const { sidebarToggle, setSidebarToggle } = useContext(SidebarToggleContext);
  const { currentConversation, setCurrentConversation } = useContext(CurrentConversationContext);
  const navigate = useNavigate();
  const api_url = import.meta.env.VITE_API_URL;
  const [cloudLink, setCloudLink] = useState('#');
  const [convoName, setConvoName] = useState('waiting');
  useEffect(() => {
    if (!conversationId || conversationId === 'undefined') {
      setCurrentConversation(null);
      navigate('/');
    }
  }, [conversationId]);
  useEffect(() => {
    if (conversationId) {
      setCurrentConversation({ conversation_id: conversationId });
    }
  }, [conversationId, setCurrentConversation]);
  const getConvoName = async () => {
    try {
      const response = await axios.get(`${api_url}/chat/conversations`, 
      {withCredentials: true}
      );
      const convos = response.data.conversations;
      //console.log("the function is running");
      
      //console.log("API response:", response.data);
      const currentConvo = convos.find(convo => convo.conversation_id === conversationId);
      // setCloudLink(response.data.conversations[0].cloudinary_url);
      // setConvoName(response.data.conversations[0].pdf_title);
      
      if (currentConvo) {
        setCloudLink(currentConvo.cloudinary_url);
        setConvoName(currentConvo.pdf_title);
        //console.log(currentConvo.pdf_title + ' found!');
      } else {
        console.error("Conversation not found", conversationId);
        //console.log("Available conversations:", convos.map(c => c.conversation_id));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  useEffect(() => {
    if (conversationId) {
      setCurrentConversation({ conversation_id: conversationId });
      getConvoName(); // Add this here to fetch the convo name when switching
    }
  }, [conversationId, setCurrentConversation]);
  return (
    <div className={`overflow-scroll h-[70.9vh] w-screen flex flex-col items-center pt-2 transition-all duration-300 ${sidebarToggle ? 'ml-64' : ''}`}>
      <div className='w-[48vw]'>
      <div className='flex items-center justify-center'><h2 className=''>
      <a href={cloudLink} className='underline' target="_blank" rel="noopener noreferrer">
      {convoName}
    </a>
      </h2></div>
      <Message conversationId={conversationId}/>
      </div>
      {/* <p>this is the conversation: {conversationId}</p> */}
    </div>
  )
}
