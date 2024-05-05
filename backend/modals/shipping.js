const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true,
  },
  shippingDate: {
    type: Date,
    required: true,
  },
  estimatedDeliveryDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Shipping", ShippingSchema);
