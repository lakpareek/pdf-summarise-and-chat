import pool from "../config/db.js";
export const createUser = async (email, fullname, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (email, fullname, password) VALUES ($1, $2, $3) RETURNING *",
    [email, fullname, hashedPassword]
  );
  return result.rows[0];
};
export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};


