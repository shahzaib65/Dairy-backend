const express = require('express');
const {createOrder,fetchOrder,updateOrder,deleteOrder} = require('../controller/Order');

const router = express.Router();
//login route
router.post("/create", createOrder);
router.get("/fetch",fetchOrder);
router.put("/update/:id",updateOrder);
router.delete("/delete/:id",deleteOrder);



module.exports = router;