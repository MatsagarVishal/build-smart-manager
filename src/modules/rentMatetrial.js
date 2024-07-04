const mongoose = require("mongoose");

const rentMaterial = new mongoose.Schema(
    {
        site:{
            type:String
        },
        material_name: {
            type: String,
            required: true
        },
        vender_name : {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
       
        Units : {
            type: Number,
            required: true
        },
        Rent : {
            type: Number,
            required: true
        },
       
    }
)

const add_rentMaterial = new mongoose.model("RentMaterial", rentMaterial);

module.exports = add_rentMaterial;