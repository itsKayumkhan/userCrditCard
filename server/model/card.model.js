import mongoose from 'mongoose';

const CardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  card: {
    type: Number, // Corrected data type
    required: true,
  },
  expire: {
    type: Number, // Corrected data type
    required: true,
  },
  cvc: {
    type: Number, // Corrected data type
    required: true,
  },
}, { timestamps: true });

const Card = mongoose.model('Card', CardSchema);

export default Card;
