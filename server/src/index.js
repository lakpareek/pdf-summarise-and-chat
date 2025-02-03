import express from 'express';
import pdfRoutes from './routes/pdf.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config({ path: '../.env' });

const app = express();
console.log('PORT from process.env:', process.env.PORT);
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: "Server is working" });
});

app.use('/api/pdf', pdfRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});