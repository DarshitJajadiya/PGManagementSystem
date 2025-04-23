import express from 'express';
import Booking from '../model/booking.js';

const router = express.Router();

router.post('/api/payments/order', async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    const dummyOrder = {
      id: `DUMMY_ORDER_${Date.now()}`,
      amount,
      currency: 'INR',
      status: 'created',
    };

    res.json(dummyOrder);
  } catch (error) {
    res.status(500).json({ message: "Payment failed. Please try again." });
  }
});

router.post('/api/payments/confirm', async (req, res) => {
  try {
    const { bookingId } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'confirmed' },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    res.json({ success: true, message: "Payment successful! Booking confirmed.", booking: updatedBooking });
  } catch (error) {
    console.error("Payment Confirmation Error:", error);
    res.status(500).json({ message: "Error confirming payment!" });
  }
});

export default router;
