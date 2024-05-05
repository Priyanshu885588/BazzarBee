const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
