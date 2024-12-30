import pg from '../model/pg.js';
import express from 'express';
const router = express.Router();

router.get('/api/pg', async (req, res) => {
  try {
    const pgData = await pg.find();
    res.status(200).json(pgData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching PG data', error: error.message });
  }
});

export default router;