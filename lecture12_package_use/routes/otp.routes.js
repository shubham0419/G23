const express = require("express");
const { generateOtp, verifyOtp } = require("../controllers/otp.controller");
const router = express.Router();

router.get("/generate",generateOtp);

router.post("/verify",verifyOtp);

module.exports = router;