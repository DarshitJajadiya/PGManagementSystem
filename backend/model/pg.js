import mongoose from 'mongoose';

// Define the PG schema
const pgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
});

const PG = mongoose.model('PG', pgSchema);

export default PG;