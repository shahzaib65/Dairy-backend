const express = require('express');
const { uploadcategory,fetchcategory,updatecategory,deletecategory,fetchCategoryById,likeCategory,unlikeCategory} = require('../controller/Category');


const router = express.Router();
//login route
router.post("/upload", uploadcategory);
router.get("/fetch",fetchcategory);
router.put("/update/:id",updatecategory);
router.delete("/delete/:id",deletecategory);
router.get("/fetchProductById/:id",fetchCategoryById);
router.put("/like",likeCategory);
router.put("/unlike",unlikeCategory);



module.exports = router;