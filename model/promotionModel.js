const mongoose = require("mongoose");
const promotionSchema = mongoose.Schema({
    promotion_title: {
        type: String
    },
    start_date:{
        type: String
    },
    end_date: {
        type: String
    },
    description: {
        type: String
    },
    promotion_image_url: {
        type: String
    }
},
{
  timestamps: true,
});
module.exports = mongoose.model("Promotion",promotionSchema)