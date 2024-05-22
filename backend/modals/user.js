const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  shippingAddress: [
    {
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
  ],
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
