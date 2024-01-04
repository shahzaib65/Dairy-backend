const mongoose = require("mongoose");
const deliverySchema = new mongoose.Schema({
riderId: {
    type: String
},
orderId: {
    type: String
},
userId: {
    type: String
},
order_status: {
    type: String,
    default: ""
}
},{
    timestamps: true
})
module.exports = mongoose.model("Delivery",deliverySchema)