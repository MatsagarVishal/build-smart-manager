const mongoose = require('mongoose');

const attendance = mongoose.Schema({
    site_name: {
        type:String,
    },
    labourId: {
        type: Array,
    },
    day: {
        type: String,  
    },
    date: {
        type: String,
    },

    attendance: {
        type: Array,
    },

})


// const saveAtt = mongoose.module('attendance', attendance);
const saveAtt = new mongoose.model("attendance", attendance);


module.exports = saveAtt;