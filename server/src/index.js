import express from 'express';
import pdfRoutes from './routes/pdf.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();
console.log('PORT from process.env:', process.env.PORT);
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/pdf', pdfRoutes);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});