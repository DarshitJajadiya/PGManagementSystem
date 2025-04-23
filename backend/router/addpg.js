import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import PG from '../model/pg.js';

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Add new PG
router.post('/api/pg/add', upload.array('images', 5), async (req, res) => {
  try {
    const { name, location, price, amenities, description, owner } = req.body;

    const pgExists = await PG.findOne({ name });
    if (pgExists) {
      return res.status(400).json({ message: 'PG already exists' });
    }

    const imagePaths = req.files.map((file) => file.filename);

    const newPG = new PG({
      name,
      location,
      price,
      amenities: amenities.split(','),
      images: imagePaths,
      description,
      owner,
    });

    await newPG.save();

    res.status(201).json({ message: 'PG added successfully', pg: newPG });
  } catch (error) {
    res.status(500).json({ message: 'Error adding PG', error: error.message });
  }
});



export default router;
