const express = require('express');
const { uploadcategory,fetchcategory,updatecategory,deletecategory} = require('../controller/Category');

const router = express.Router();
//login route
router.post("/upload", uploadcategory);
router.get("/fetch",fetchcategory);
router.put("/update/:id",updatecategory);
router.delete("/delete/:id",deletecategory);


module.exports = router;