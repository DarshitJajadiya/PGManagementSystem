import express from 'express';
import multer from 'multer';
import path from 'path';
import PG from '../model/pg.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); 
  },
});

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true); 
//     cb(new Error('Only image files are allowed!'), false); 
  // }
// };

const upload = multer({
  storage,
  // fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

router.post('/api/pg/add', upload.array('images', 5), async (req, res) => {
  try {
    const { name, location, price, amenities, description } = req.body;

    const imagePaths = req.files.map((file) => path.join('uploads', file.filename));

    const newPG = new PG({
      name,
      location,
      price,
      amenities: amenities.split(','), // Convert amenities string to an array
      images: imagePaths, // Store file paths of uploaded images
      description,
    });

    await newPG.save();

    res.status(201).json({ message: 'PG added successfully', pg: newPG });
  } catch (error) {
    res.status(500).json({ message: 'Error adding PG', error: error.message });
  }
});

export default router;
