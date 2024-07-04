const mongoose = require("mongoose");

// creating table for Database / scheama
const userRes = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true
        },
        
        Email: {
            type: String,
            required: true,
        },
        
        Password: {
            type: String,
            required: true

        },
        orgName: {
            type: String,
            required: true
        }
       

    }
)

//  we need to create a collection

const UserData = new mongoose.model("ourUser", userRes);

module.exports = UserData;