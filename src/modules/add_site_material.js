const mongoose = require("mongoose");

const material = new mongoose.Schema(
    {
     user:{
         type:String,
     },   
        material_name: {
            type: String,
            required: true
        },
        site: {
            type: String,
            required: true
        },
        Company_name: {
            type: String,
            required: true
        },
       
        Price : {
            type: Number,
            required: true
        },
        Total : {
            type: Number,
            required: true
        },
        Units : {
            type: Number,
            required: true
        },
       
    }
)

const add_material = new mongoose.model("site_Material", material);

module.exports = add_material;