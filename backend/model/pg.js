import mongoose from 'mongoose';

const pgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], required: true },
  images: { type: [String], required: true }, // Array of image file paths
  description: { type: String, required: true },
});

export default mongoose.model('PG', pgSchema);
