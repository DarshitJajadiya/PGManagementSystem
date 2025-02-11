import express from 'express';
import Booking from '../model/Booking.js';

const router = express.Router();

router.post('/api/bookings', async (req, res) => {
  try {
    const { userId, pgId, checkInDate, duration, price } = req.body;

    const existingBooking = await Booking.findOne({ userId, pgId, status: { $ne: "Cancelled" } });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: "You already have a booking for this PG!" });
    }

    const newBooking = new Booking({
      userId,
      pgId,
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


router.get('/api/bookings/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('pgId');

    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No bookings found for this user." });
    }

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Cancel a booking
router.put('/bookings/cancel/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found!" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
