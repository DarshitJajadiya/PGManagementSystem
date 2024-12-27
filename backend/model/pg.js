import mongoose from 'mongoose';

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'PG name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    amenities: {
      type: [String], // Array of amenities
      default: [],
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const PG = mongoose.model('PG', pgSchema);

export default PG;
