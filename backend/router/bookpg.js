import express from 'express';
import Booking from '../model/Booking.js';

const router = express.Router();

// Create a booking
router.post('/api/bookings', async (req, res) => {
  try {
    const { userId, pgsId, checkInDate, duration, price } = req.body;
    console.log(userId, pgsId, checkInDate, duration, price); // Log the received values

    // Check if the user already has an active booking for this PG
    const existingBooking = await Booking.findOne({ userId, pgsId, status: { $ne: "Cancelled" } });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "You already have a booking for this PG!" });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      pgsId,  // Use pgsId as it is in the frontend
      checkInDate,
      duration,
      price,
      status: 'Pending',
    });

    await newBooking.save();
    res.status(201).json({ success: true, bookingId: newBooking._id });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all bookings for a user
// Get all bookings for a user
router.get('/api/bookings/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('pgsId'); // Corrected here

    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No bookings found for this user." });
    }

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// Cancel a booking
router.delete('/api/bookings/cancel/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found!" });
    }

    res.json({ success: true, message: "Booking cancel successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default router;
