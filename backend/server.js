import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './router/auth.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Important: Parses incoming JSON requests
app.use(authRoutes); // Use your routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
