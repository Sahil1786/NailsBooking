const express = require("express");
const router = express.Router();

const userRouter = require("../controllers/user");
const bookingRouter = require("../controllers/booking");

console.log("Routers Loaded:");
console.log("userRouter:", typeof userRouter);
console.log("bookingRouter:", typeof bookingRouter);

router.use("/user", userRouter);
router.use("/booking", bookingRouter);

module.exports = router;
