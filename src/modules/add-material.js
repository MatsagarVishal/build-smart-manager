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
        Company_name: {
            type: String,
            required: true
        },
       
       
    }
)

const add_material = new mongoose.model("Material", material);

module.exports = add_material;