import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './router/auth.js';
import searchRoutes from './router/searchauth.js';
import addpgRoutes from './router/addpg.js';


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(authRoutes);
app.use(searchRoutes); 
app.use(addpgRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
