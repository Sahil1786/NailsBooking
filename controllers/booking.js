const express = require("express");
const Booking = require("../models/Booking");
const { authMiddleware } = require("../middleware/auth");
const { sendBookingEmail } = require("../providers/emailProvider");
const router = express.Router();
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const b = await Booking.create({
      user_id: req.user.id,

      service_type: req.body.service_type,   
      service_name: req.body.service_name,   

      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes
    });

   
    sendBookingEmail({
      email: req.userData.email,
      name: req.userData.name,
      service_type: req.body.service_type,
      service_name: req.body.service_name,
      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes
    });

    res.json({ message: "Booking created", booking: b });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/my-bookings", authMiddleware, async (req, res) => {
  const bookings = await Booking.find({ user_id: req.user.id })
    .sort({ createdAt: -1 });

  res.json({ bookings });
});


module.exports = router;
