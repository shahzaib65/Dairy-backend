const mongoose = require("mongoose");
const zoneSchema = new mongoose.Schema({
    province: {
        type: String
    },
    city: {
        type: String
    },
    area: {
        type: String
    }
},{
    timestamps: true
});
module.exports = mongoose.model("Zone",zoneSchema);