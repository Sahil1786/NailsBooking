const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authMiddleware } = require("../middleware/auth");
const { sendSignupEmail } = require("../providers/emailProvider");

const router = express.Router();



router.post("/signup", async (req, res) => {
  try {
    const { login_id, name, email, mobile, password } = req.body;

    const exists = await User.findOne({ login_id });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      login_id,
      name,
      email,
      mobile,
      password: hashed
    });

   
    if (email) {
      sendSignupEmail({
        email,
        name,
        login_id,
        password   // PLAIN TEXT here
      });
    }

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { login_id, password } = req.body;

    const user = await User.findOne({ login_id });
    if (!user) return res.status(400).json({ message: "Invalid login ID" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h"
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* USER DETAILS */
router.get("/details", authMiddleware, (req, res) => {
  res.json({ user: req.userData });
});

/* CHANGE PASSWORD */
router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.new_password, 10);

    await User.findByIdAndUpdate(req.user.id, { password: hashed });

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
