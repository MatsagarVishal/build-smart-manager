const mongoose = require("mongoose");

const vender = new mongoose.Schema(
    {
        user:{
            type:String
        },
       
        vender_name: {
            type: String,
            required: true
        },
        shop_name : {
            type: String,
            required: true
        },
       
        mobileNumber : {
            type: Number,
            required: true
        },
       
    }
)

const add_vender = new mongoose.model("Vender", vender);

module.exports = add_vender;