const mongoose = require("mongoose");
const riderSchema = mongoose.Schema({
    rider_name: {
        type: String
    },
    rider_phone:{
        type: String
    },
    adhar_no: {
        type: String
    },
    address: {
        type: String
    },
    rider_image_url: {
        type: String
    },
    online: {
        type: Boolean,
        default: false
    }
},
{
  timestamps: true,
});
module.exports = mongoose.model("Rider",riderSchema)