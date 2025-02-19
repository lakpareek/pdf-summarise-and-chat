import { createContext, useState, useContext } from "react";
import axios from 'axios';


export const CurrentConversationContext = createContext();

export const CurrentConversationProvider = ({ children }) => {
    const [currentConversation, setCurrentConversation] = useState({});
    const [messages, setMessages] = useState([]);

    const api_url = import.meta.env.VITE_API_URL;

    
    return (
        <CurrentConversationContext.Provider value={{ currentConversation, setCurrentConversation }}>
            {children}
        </CurrentConversationContext.Provider>
    )
}

//export const useCurrentConversation = () => useContext(CurrentConversationContext);