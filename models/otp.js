const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    createdAt: { type: Date, expires: 120, default: Date.now },
    otp : {
        type : String,
        require : true
    },
    email :{
        type : String,
        require : true
    }
})

const otpModel = mongoose.model('Otp',otpSchema);
module.exports = {otpModel}