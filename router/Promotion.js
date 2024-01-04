const express = require('express');
const { uploadPromotion,fetchPromotions,updatePromotion,deletePrmotion} = require('../controller/Promotion');

const router = express.Router();
//login route
router.post("/upload", uploadPromotion);
router.get("/fetch",fetchPromotions);
router.put("/update/:id",updatePromotion);
router.delete("/delete/:id",deletePrmotion);


module.exports = router;