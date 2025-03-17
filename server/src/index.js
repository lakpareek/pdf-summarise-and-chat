import express from 'express';
import pdfRoutes from './routes/pdf.route.js';
import authRoutes from './routes/auth.route.js';
import chatRoutes from './routes/chat.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { io, server, app } from './socket/socket.js';
dotenv.config({ path: '../.env' });

console.log('PORT from process.env:', process.env.PORT);
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://pdf-summarise-and-chat.vercel.app",
  "https://pdf-summarise-and-chat-10xvd3szj-lakpareeks-projects.vercel.app"
 ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.use('/api/pdf', pdfRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

server.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
