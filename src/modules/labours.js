const mongoose = require("mongoose");

const labour = new mongoose.Schema(
    {
        user:{
            type:String,
        },
        site:{
            type:String,
        },
        unique:{
            type:Number,
            default: 0
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
            required: true

        }

    }
)

const laboursDB = new mongoose.model("labour", labour);

module.exports = laboursDB;