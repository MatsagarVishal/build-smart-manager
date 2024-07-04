const mongoose = require("mongoose");

const site = new mongoose.Schema(
    {
       user:{
           type:String,
       },
        site_name: {
            type: String,
            required: true
        },
        site_owner: {
            type: String,
            required: true
        },

    }
)




const addsiteDB = new mongoose.model("Site", site);



module.exports = addsiteDB;