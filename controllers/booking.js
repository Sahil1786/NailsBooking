const express = require("express");
const Booking = require("../models/Booking");
const { authMiddleware } = require("../middleware/auth");
const { sendBookingEmail, sendAdminBookingEmail} = require("../providers/emailProvider");
const router = express.Router();
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const b = await Booking.create({
      user_id: req.user.id,

      user_name: req.userData.name,
      user_email: req.userData.email,
      user_mobile: req.userData.mobile,

      service_type: req.body.service_type,
      service_name: req.body.service_name,
      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes
    });

    // USER EMAIL (already working)
    sendBookingEmail({
      email: req.userData.email,
      name: req.userData.name,
      service_type: req.body.service_type,
      service_name: req.body.service_name,
      date: req.body.date,
      time: req.body.time,
      notes: req.body.notes
    });

    // ⭐ ADMIN EMAIL (NEW)
    sendAdminBookingEmail({
      adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL,
      user_name: req.userData.name,
      user_email: req.userData.email,
      user_mobile: req.userData.mobile,
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


router.get("/bookings", authMiddleware, async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });

  const formatted = bookings.map(b => ({
    id: b._id,
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


module.exports = router;
