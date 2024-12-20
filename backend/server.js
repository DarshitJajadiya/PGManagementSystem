import express from 'express';
import bodyParser from 'body-parser';   
import mongoose from 'mongoose';    
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

