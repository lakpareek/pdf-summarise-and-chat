import pool from "../config/db.js";


export const createConversation = async (user_id, pdf_id, pdf_text) => {
    try {
        const result = await pool.query(
            `INSERT INTO conversations (user_id, pdf_id, pdf_text)
             VALUES ($1, $2, $3) RETURNING *;`,
            [user_id, pdf_id, pdf_text]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting conversation record:", error);
        throw error;
    }
}

export const createMessage = async (conversation_id, sender, message) => {
    try {
        const result = await pool.query(
            `INSERT INTO messages (conversation_id, sender, message)
             VALUES ($1, $2, $3) RETURNING *;`,
            [conversation_id, sender, message]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting message record:", error);
        throw error;
    }
}

export const getConversation = async (pdf_id) => {
    try {
        const result = await pool.query(
            `SELECT id FROM conversations WHERE pdf_id = $1 LIMIT 1;`,
            [pdf_id]
        );

        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        throw error;
    }
};


export const getConversations = async (user_id) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.id as conversation_id,
                p.title as pdf_title,
                p.cloudinary_url,
                p.id as pdf_id
            FROM conversations c
            JOIN pdfs p ON c.pdf_id = p.id
            WHERE c.user_id = $1
            ORDER BY c.started_at DESC
        `, [user_id]);
        
        return result.rows;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
};


export const getMessagesFromConvo = async (conversation_id) => {
    try {
        const result = await pool.query(`
            SELECT 
                m.id as message_id,
                m.sender,
                m.message,
                m.sent_at
            FROM messages m
            WHERE m.conversation_id = $1
            ORDER BY m.sent_at ASC
        `, [conversation_id]);
        
        return result.rows;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}