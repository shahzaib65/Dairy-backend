const express = require('express');
const {uploadRider,fetchriders,updaterider,deleteRider} = require('../controller/Rider');

const router = express.Router();
//login route
router.post("/upload", uploadRider);
router.get("/fetch",fetchriders);
router.put("/update/:id",updaterider);
router.delete("/delete/:id",deleteRider);


module.exports = router;