const express = require('express');
const {addSubscription,fetchSubscription,updateSubscription,deleteSubscription} = require('../controller/Subscription');

const router = express.Router();
//login route
router.post("/add", addSubscription);
router.get("/fetch/:id",fetchSubscription);
router.put("/update/:id",updateSubscription);
router.delete("/delete/:id",deleteSubscription);

module.exports = router;