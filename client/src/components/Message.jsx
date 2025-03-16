import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentConversationContext } from "../context/CurrentConversationContext";
import axios from 'axios';
import { socket } from "../socket";

export default function Message({conversationId}) {
  const api_url = import.meta.env.VITE_API_URL;
  //const { currentConversation } = useContext(CurrentConversationContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        //console.log(conversationId + " is the conversation id");
        const result = await axios.get(
          `${api_url}/chat/${conversationId}`, 
          { withCredentials: true }
        );
        setMessages(result.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    if (conversationId) {
      fetchMessages();
      socket.emit("joinConversation", conversationId);
      //console.log("messages fetched");
    }
  
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("Received:", message.message);
    };
  
    socket.on("receiveMessage", handleReceiveMessage);
  
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [conversationId]);
  



  return (
    <div className="flex flex-col gap-5 p-4">
      
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`w-[40vw] ${message.sender === "model" ? "rounded-r-3xl bg-zinc-800" : "rounded-l-3xl bg-neutral-200 text-zinc-800 ml-[8vw]"} rounded-t-3xl p-3`}
        >
          <p className="">{message.message}</p>
        </div>
      ))}
    </div>
  );
}