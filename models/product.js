const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type:String,
        require:true,
        trim:true
    },
    category : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    price:{
        type:Number
    },
    description:{
        type: String
    },
    material:{
        type:String
    },
    size_s : {
        type:Number,
        default : 0
    },
    size_m : {
        type:Number,
        default : 0
    },
    size_l : {
        type:Number,
        default : 0
    },
    size_xl : {
        type:Number,
        default : 0
    },
    primaryImage : {
        type:String,
    },
    secondaryImage : {
        type:String,
    }
})

const productModel = mongoose.model('Product',productSchema)
module.exports = {productModel};