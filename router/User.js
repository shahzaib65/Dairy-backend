const express = require('express');
const { loginUser,verifyOtp,fetchUser,updateStatus} = require('../controller/User');

const router = express.Router();
//login route
router.post("/login", loginUser);
router.post("/verifyOtp",verifyOtp)
router.get("/fetch",fetchUser)
router.put("/update/:id",updateStatus)

module.exports = router;