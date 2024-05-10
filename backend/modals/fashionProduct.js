const mongoose = require("mongoose");

const FashionProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityAvailable: {
    sizes: {
      type: [String],
      required: true,
    },
    quantities: {
      type: [Number],
      required: true,
    },
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ratings: {
    type: [Number],
    default: [0, 0, 0, 0, 0],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("FashionProduct", FashionProductSchema);
