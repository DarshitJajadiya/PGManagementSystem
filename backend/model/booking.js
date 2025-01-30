import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pgId: { type: mongoose.Schema.Types.ObjectId, ref: 'PG', required: true },
  checkInDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in months
  price: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
});

export default mongoose.model('Booking', bookingSchema);