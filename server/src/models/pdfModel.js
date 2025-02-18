import pool from "../config/db.js";

export const createPdf = async (userId, cloudinaryUrl, title) => {
    try {
        const result = await pool.query(
            `INSERT INTO pdfs (user_id, cloudinary_url, title)
             VALUES ($1, $2, $3) RETURNING *;`,
            [userId, cloudinaryUrl, title]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting PDF record:", error);
        throw error;
    }
};