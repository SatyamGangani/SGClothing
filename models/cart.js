const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    product : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity : {
        type:Number,
        require:true
    },
    size : {
        type : String,
        require:true
    }
})

const cartModel = mongoose.model('Cart',cartSchema);
module.exports = {cartModel};