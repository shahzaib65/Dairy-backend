const express = require('express');
const {uploadZone,updateZone,fetchZone,deleteZone} = require('../controller/Zone');
const router = express.Router();
router.post("/upload",uploadZone);
router.put('/update/:id',updateZone);
router.put("/fetch",fetchZone);
router.delete("/delete/:id",deleteZone)


module.exports = router