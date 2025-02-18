import pool from "../config/db.js";
import { getConversations, getMessagesFromConvo, createMessage } from "../models/conversationsModel.js";
import { generateChatResponse } from "../services/gemini.js";

export const getConvosForSidebar = async (req, res) => {
    try {
        const conversations = await getConversations(req.user.id);
        return res.status(200).json({
            success: true,
            conversations,
        });
    } catch (error) {
        console.error("Error getting conversations for sidebar:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get conversations for sidebar",
        });
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await getMessagesFromConvo(req.params.conversation_id);
        return res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error("Error getting messages for conversation:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get messages for conversation",
        });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const extractedText = await pool.query(`SELECT pdf_text FROM conversations WHERE id = $1`, [req.params.conversation_id]);
        const message = await createMessage(req.params.conversation_id, "user", req.body.message);
        const conversation = await getMessagesFromConvo(req.params.conversation_id);
        const aiResponse = await generateChatResponse(extractedText, conversation);
        await createMessage(req.params.conversation_id, 'model', aiResponse);
        return res.status(200).json({
            success: true,
            message: aiResponse,
        });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
}