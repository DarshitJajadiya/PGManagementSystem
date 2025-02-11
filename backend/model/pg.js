import mongoose from 'mongoose';

const pgSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], required: true },
  images: { type: [String], required: true }, // Array of image file paths
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the PG owner
});

export default mongoose.model('PG', pgSchema);
