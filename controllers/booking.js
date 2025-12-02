const express = require("express");
const Booking = require("../models/Booking");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

/* CREATE BOOKING */
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const b = await Booking.create({
      user_id: req.user.id,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes
    });

    res.json({ message: "Booking created", booking: b });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET USER BOOKINGS */
router.get("/my-bookings", authMiddleware, async (req, res) => {
  const bookings = await Booking.find({ user_id: req.user.id });
  res.json({ bookings });
});

module.exports = router;
