import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './router/auth.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.use('/api', authRoutes); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
