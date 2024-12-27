// routes/pgRoutes.js
import express from 'express';
import PG from '../model/pg.js';
const router = express.Router();

router.post('/api/pg/add', async (req, res) => {
  try {
    const { name, location, price} = req.body;

    const newPG = new PG({
      name,
      location,
      price,
    });

    await newPG.save();
    res.status(201).json({ message: 'PG added successfully', pg: newPG });
  } catch (error) {
    res.status(500).json({ message: 'Error adding PG', error: error.message });
  }
});

export default router;