const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    title: {
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
    }
},
{
  timestamps: true,
});
module.exports = mongoose.model("Category",categorySchema)