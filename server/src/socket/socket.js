import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// const userSocketMap = {}; // Store userId -> socketId mapping

io.on("connection", (socket) => {
	console.log("A user connected");

    socket.on("joinConversation", (conversationId) => {
        socket.join(conversationId);
        console.log(`User joined conversation: ${conversationId}`);
      });
    
      socket.on("sendMessage", (message) => {
        const { conversationId, content } = message;
        io.to(conversationId).emit("receiveMessage", { message: content, sender: "user" });
        console.log(`Message sent to conversation ${conversationId}: ${content}`);
      });
    
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });


});

export { app, io, server };
