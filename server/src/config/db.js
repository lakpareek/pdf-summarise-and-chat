import pkg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

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
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

const createPdfsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pdfs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        cloudinary_url TEXT NOT NULL,
        title VARCHAR(255),
        summary TEXT,
        uploaded_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("PDFs table is ready.");
  } catch (error) {
    console.error("Error creating PDFs table:", error);
  }
};

const createConversationsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        pdf_id UUID REFERENCES pdfs(id) ON DELETE CASCADE,
        started_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Conversations table is ready.");
  } catch (error) {
    console.error("Error creating Conversations table:", error);
  }
};

const createSenderEnum = async () => {
  try {
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE sender_enum AS ENUM ('user', 'ai');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    console.log("ENUM sender_enum is ready.");
  } catch (error) {
    console.error("Error creating ENUM sender_enum:", error);
  }
};

const createMessagesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
        sender sender_enum NOT NULL,
        message TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Messages table is ready.");
  } catch (error) {
    console.error("Error creating Messages table:", error);
  }
};

const initializeDB = async () => {
  await createUsersTable();
  await createPdfsTable();
  await createConversationsTable();
  await createSenderEnum();
  await createMessagesTable();
};

initializeDB();

export default pool;
