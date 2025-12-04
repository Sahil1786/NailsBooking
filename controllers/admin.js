const express = require("express");
const jwt = require("jsonwebtoken");
const { adminAuth, } = require("../middleware/auth");
const Booking = require("../models/Booking");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(400).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign({ admin: true }, process.env.ADMIN_SECRET, {
    expiresIn: "3h"
  });

  res.json({ token });
});


router.get("/bookings", adminAuth, async (req, res) => {
  const bookings = await Booking.find()
    .populate("user_id", "name login_id email mobile")   // ⭐ added mobile
    .sort({ createdAt: -1 });

  const formatted = bookings.map(b => ({
    id: b._id,
    userName: b.user_id?.name,
    email: b.user_id?.email,
    login_id: b.user_id?.login_id,
    mobile: b.user_id?.mobile,      // ⭐ added mobile number
    service_type: b.service_type,
    service_name: b.service_name,
    date: b.date,
    time: b.time,
    notes: b.notes,
    status: b.status,
    createdAt: b.createdAt
  }));

  res.json({ bookings: formatted });
});


router.put("/bookings/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body; // "pending", "confirmed", "cancelled"

    const b = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!b) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Status updated", booking: b });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/bookings/:id/datetime", adminAuth, async (req, res) => {
  try {
    const { date, time } = req.body;

    const b = await Booking.findByIdAndUpdate(
      req.params.id,
      { date, time },
      { new: true }
    );

    if (!b) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Date & time updated", booking: b });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;