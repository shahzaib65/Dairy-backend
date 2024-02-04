const express = require('express');
const {addCart,fetchCart,updateCart, deleteFromCart,subCart} = require('../controller/Cart');
const { route } = require('./Zone');

const router = express.Router();
//login route
router.post("/addToCart", addCart);
router.get("/fetch",fetchCart);
router.put("/update/:id",updateCart);
router.delete("/delete/:id",deleteFromCart);
router.post("/sub",subCart);


module.exports = router;