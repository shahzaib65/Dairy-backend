const express = require('express');
const {addCart,fetchCart,updateCart, deleteFromCart} = require('../controller/Cart');

const router = express.Router();
//login route
router.post("/add", addCart);
router.get("/fetch",fetchCart);
router.put("/update/:id",updateCart);
router.delete("/delete/:id",deleteFromCart);


module.exports = router;