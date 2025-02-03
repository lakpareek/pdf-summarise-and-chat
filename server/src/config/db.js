import pkg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

console.log("Environment variables after loading:", {
  PORT: process.env.PORT,
  DB_PORT: process.env.DB_PORT,
  envPath: join(__dirname, '../../.env') 
});

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "pdfApplication",
  password: process.env.DB_PASSWORD || "asdfghjkl",
  port: Number(process.env.DB_PORT) || 5432,
});

const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        fullname VARCHAR(100) NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table is ready.");
    console.log("Database Config:", pool.options);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

createUsersTable();

export default pool;