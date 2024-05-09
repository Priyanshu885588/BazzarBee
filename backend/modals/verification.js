const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificationCode: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Set an index on createdAt and expiresAt for efficient expiration cleanup
VerificationSchema.index({ createdAt: 1 }, { expires: "1h" });

module.exports = mongoose.model("Verification", VerificationSchema);
