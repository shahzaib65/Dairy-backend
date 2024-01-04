const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
 subscription_type: {
    type: String
 },
 subscription_amount: {
    type: Number
 },
 subscription_price:{
   type: Number
 },
 userId: {
    type: String
 },
 valid_till: {
    type: Date
 },
 subscription: {
    type: Boolean,
    default: false
 }
},{
    timestamps: true
});
module.exports = mongoose.model("Subscription",subscriptionSchema)