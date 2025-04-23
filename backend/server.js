import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './router/auth.js';
import searchRoutes from './router/searchauth.js';
import addpgRoutes from './router/addpg.js';
import pgdata from './router/pgdata.js'
import bookpg from './router/bookpg.js';
import payment from './router/payment.js';
import Booking from './model/booking.js';


dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json()); 
app.use(authRoutes);
app.use(searchRoutes); 
app.use(addpgRoutes); 
app.use(pgdata);
app.use(bookpg);
app.use(payment);

app.use('/uploads', express.static('uploads'));

const router=express.Router();
app.use(router);

router.post('/api/bookings/owner', async (req, res) => {
  try {
    const { pgIds } = req.body;
    if (!pgIds || pgIds.length === 0) {
      return res.status(400).json({ success: false, message: "No PGs provided." });
    }

    // Find all bookings for these PGs
    const bookings = await Booking.find({ pgsId: { $in: pgIds } })
      .populate("userId", "name email phone")  // Populate user details
      .populate("pgsId", "name location price"); // Populate PG details

    // Structure data: { pgId: [bookings] }
    const bookingsByPG = {};
    bookings.forEach(booking => {
      if (!bookingsByPG[booking.pgsId._id]) {
        bookingsByPG[booking.pgsId._id] = [];
      }
      bookingsByPG[booking.pgsId._id].push(booking);
    });

    res.json({ success: true, bookings: bookingsByPG });
  } catch (error) {
    console.error("Error fetching owner bookings:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
