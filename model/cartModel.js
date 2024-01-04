const mongoose = require("mongoose");
const {Schema} = mongoose;
const cartSchema = new mongoose.Schema({
    quantity: { type : Number, required: true},
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
});
module.exports = mongoose.model("Cart",cartSchema)