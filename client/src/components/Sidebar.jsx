import React, { useEffect, useState, useContext } from "react";
import { SidebarToggleContext } from "../context/SidebarToggleContext";
import { CurrentConversationContext } from "../context/CurrentConversationContext";
import MenuToggleBar from "./MenuToggleBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { currentConversation, setCurrentConversation } = useContext(CurrentConversationContext);
  const { sidebarToggle } = useContext(SidebarToggleContext);
  const api_url = import.meta.env.VITE_API_URL;
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const result = await axios.get(`${api_url}/chat/conversations`, {
          withCredentials: true,
        });
        setConversations(result.data.conversations);
        console.log("Conversations fetched from sidebar:", result.data.conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    getConversations();
  }, [currentConversation]);

  useEffect(() => {
    if (currentConversation) {
      navigate(`/chat/${currentConversation.conversation_id}`); // Route to the current conversation
    }
  }, [currentConversation, navigate]);

  const handleNewConversation = () => {
    setCurrentConversation(null); // Reset currentConversation context
    navigate("/"); // Navigate to base URL
  };

  return (
    <div className={`${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out sm:w-64 w-full z-40 bg-[#303030] fixed h-full overflow-y-scroll`}
    >
      <div className="sticky top-0 bg-[#303030] z-50">
        <div className="px-3 py-4">
        <MenuToggleBar />
      </div>
      <div className="flex justify-center">
        <hr className="w-[75%] border-gray-500" />
      </div>
      </div>
      <ul className="mt-3 text-[#ECECEC] text-sm px-3 py-3">
        <li
          onClick={handleNewConversation}
          className="mb-2 rounded hover:shadow py-2 hover:bg-[#3A3A3A] cursor-pointer"
        >
          <a href="#" className="px-4 -ml-3">
            ➕ New Conversation
          </a>
        </li>
        {conversations.map((conversation) => (
          <li
            key={conversation.conversation_id}
            onClick={() => setCurrentConversation(conversation)}
            className={`mb-2 rounded hover:shadow py-2 ${
              currentConversation && currentConversation.conversation_id === conversation.conversation_id
                ? "bg-[#242020] hover:bg-[#242020]"
                : "hover:bg-[#3A3A3A]"
            }`}
          >
            <a href="#" className="px-4 -ml-3">
              {conversation.pdf_title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
