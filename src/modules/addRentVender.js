const mongoose = require("mongoose");

const addRentVender = new mongoose.Schema(
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
       
        mobileNumber: {
            type: Number,
            required: true
        },
       
    }
)

const add_rentVender = new mongoose.model("addRentMaterial", addRentVender);

module.exports = add_rentVender;