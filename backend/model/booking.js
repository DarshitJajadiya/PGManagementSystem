import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Ensure 'User' is correct
  pgsId: { type: mongoose.Schema.Types.ObjectId, ref: 'PG', required: true },  // Change 'pg' to 'PG'
  checkInDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in months
  price: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;