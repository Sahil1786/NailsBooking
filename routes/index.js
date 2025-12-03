const express = require("express");
const router = express.Router();

const userRouter = require("../controllers/user");
const bookingRouter = require("../controllers/booking");
const adminRouter = require("../controllers/admin");




router.use("/user", userRouter);
router.use("/booking", bookingRouter);
router.use("/admin", adminRouter);


module.exports = router;
