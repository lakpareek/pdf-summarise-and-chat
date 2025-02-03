import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const result = await pool.query("SELECT id, fullname, email FROM users WHERE id = $1", [decoded.userId]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default protectRoute;
