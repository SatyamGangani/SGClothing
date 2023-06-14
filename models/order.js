const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user :{
        type :  mongoose.Types.ObjectId,
        ref : 'User',
        require : true  
        },
    items : [{
        product : {
            type : mongoose.Types.ObjectId,
            ref : 'Product',
            require : true
        },
        quantity : {
            type : Number
        },
        size : {
            type : String
        }
    }],
    amount : {
        type : Number,
        require : true
    },
    address : {
        type : String,
        require : true 
    },
    zip_code : {
        type : String,
    },
    city : {
        type : String,
        require : true
    },
    country : {
        type : String,
        require : true
    },
    card_number : {
        type : String,
        require : true
    },
    order_date : {
        type : Date,
        default : Date.now
    }
})

const orderModel = mongoose.model('order',orderSchema);

module.exports = {orderModel};