import pool from "../config/db.js";

export const createPdf = async (userId, cloudinaryUrl, title, summary) => {
    try {
        const result = await pool.query(
            `INSERT INTO pdfs (user_id, cloudinary_url, title, summary)
             VALUES ($1, $2, $3, $4) RETURNING *;`,
            [userId, cloudinaryUrl, title, summary]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting PDF record:", error);
        throw error;
    }
};