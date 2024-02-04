const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const cartSchema = new mongoose.Schema({
    quantity: { type : Number,default:0},
    productId: { type: ObjectId, ref: 'Category'},
    userId:{ type: ObjectId, ref: 'User'},
},{
    timestamps: true
});
module.exports = mongoose.model("Cart",cartSchema)