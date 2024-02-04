const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const categorySchema = mongoose.Schema({
    title: {
        type: String
    },
    name: {
        type: String
    },
    weight:{
        type: String
    },
    price: {
        type: Number
    },
    discount_price: {
        type: Number
    },
    discount_percentage: {
        type: Number
    },
    premium_percentage: {
        type: Number
    },
    stock: {
        type: Number
    },
    premium_discount_price: {
        type: Number,
        default:0
    },
    category_image_url: {
        type: String
    },
    favorite:[{type:ObjectId,ref:"User"}],
},
{
  timestamps: true,
});
module.exports = mongoose.model("Category",categorySchema)