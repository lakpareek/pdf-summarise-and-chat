import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext(undefined);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
};

const socketURL = "http://localhost:3001"; // Backend server

const SocketContextProvider = ({ children }) => {
    const socketRef = useRef(null);
    const { user, loading } = useAuthContext();

    useEffect(() => {
        if (!loading && user) {
            socketRef.current = io(socketURL, {
                query: { userId: user.id }, // Send user ID to backend
                withCredentials: true,
            });

            socketRef.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            return () => {
                socketRef.current.disconnect();
            };
        }
    }, [user, loading]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
