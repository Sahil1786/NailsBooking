const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    user_name: String,   
    user_email: String,  
    user_mobile: String, 

    service_type: String,
    service_name: String,

    date: String,
    time: String,
    notes: String,
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
