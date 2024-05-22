const mongoose = require("mongoose");
const user = require("./user");

const CheckoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      attributes: {
        size: {
          type: String,
          required: false,
        },
        color: {
          type: String,
          required: false,
        },
      },
    },
  ],
  Address: {
    pinCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    Town: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  typeOfAddress: {
    type: String,
    required: true,
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 199,
  },
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
