const mongoose = require("mongoose");

const site = new mongoose.Schema(
    {

        site_name: {
            type: String,
            required: true
        },
        site_owner: {
            type: String,
            required: true
        }, 
        PayType: {
            type: String,
            required: true
        },
        date: {
            type: String,
        },
        amount: {
            type: Number,
            required:true
        },

    }
)




const sitePayment = new mongoose.model("SitePayment", site);



module.exports = sitePayment;