const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    service_type: {
      type: String,
      enum: ["makeup", "nails"],
      required: true
    },

    service_name: { type: String, required: true }, // e.g. Bridal Makeup, Gel Nails

    date: String,
    time: String,
    notes: String,

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
