const mongoose = require("mongoose");
const { Schema } = mongoose;
const paymentMethods = {
    values: ['card', 'cash'],
    message: 'enum validator failed for payment Methods'
  }

const orderSchema = new mongoose.Schema({
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true, enum: paymentMethods },
    paymentStatus: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
},
{ timestamps: true })
module.exports = mongoose.model("Order",orderSchema)