import express from 'express';
import PG from '../model/pg.js';

const router = express.Router();

// Controller for handling search
router.get('/search', async (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Search in the database
    const results = await PG.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ],
    });

    res.json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default router;
