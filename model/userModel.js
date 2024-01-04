const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    
        mobile_number: {
          type: String,
        },
        role: {
          type: String,
          default: "user",
        },
        otp: {
          type: String
        },
        online: {
          type: Boolean,
          default: false
        },
        subscription_type: {
          type: String,
          default: ""
        }
      },
      {
        timestamps: true,
      }
);
module.exports = mongoose.model("User",userSchema)