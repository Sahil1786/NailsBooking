const express = require("express");
const jwt = require("jsonwebtoken");
const { adminAuth, } = require("../middleware/auth");
const Booking = require("../models/Booking");
const User = require("../models/User");
const { sendStatusChangeEmail, sendDateTimeChangeEmail} = require("../providers/emailProvider");


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
  const bookings = await Booking.find().sort({ createdAt: -1 });

  const formatted = bookings.map(b => ({
    id: b._id,

    // ⭐ direct data from booking document
    userName: b.user_name,
    email: b.user_email,
    mobile: b.user_mobile,

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
    const { status } = req.body;

    const b = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!b) return res.status(404).json({ message: "Booking not found" });

    // ⭐ Send Email to User
    sendStatusChangeEmail({
      email: b.user_email,
      name: b.user_name,
      service_name: b.service_name,
      status,
      date: b.date,
      time: b.time
    });

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

    // ⭐ Notify User
    sendDateTimeChangeEmail({
      email: b.user_email,
      name: b.user_name,
      service_name: b.service_name,
      date,
      time
    });

    res.json({ message: "Date & time updated", booking: b });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const formatted = users.map(u => ({
      id: u._id,
      login_id: u.login_id,
      name: u.name,
      email: u.email,
      mobile: u.mobile,
      createdAt: u.createdAt
    }));

    res.json({ users: formatted });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;