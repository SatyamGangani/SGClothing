const {cartModel} = require('../models/cart');
const {userModel} = require('../models/user');
const {productModel} = require('../models/product')


const getCart = async (req,res)=>{
    let data = req.query;
    // console.log(data);
    let userId = await userModel.findOne({_id:data.id});
    let cartIds = await cartModel.find({user:data.id},{user:0})
    .populate({path : 'product',select : {'name':1,_id:0,primaryImage:1,price:1}});
    console.log("GET /userCart");
    return res.json(cartIds);
}

const updateCart = async (req,res)=>{
    let data = req.body;
    let sizeObj = {
        'S' : 'size_s',
        'M' : 'size_m',
        'L' : 'size_l',
        'XL' : 'size_xl'
    };
    let cartId = await cartModel.findOne({_id:data.cartId})
    .populate({path : 'product',select : {'size_s':1,'size_m':1,'size_l':1,'size_xl':1}});
    if(cartId){
        let qty = cartId.quantity;
        if(data.action=='add'){
            if(qty==cartId.product[sizeObj[cartId.size]]){
                return res.json({'error' : "Qty exceeded."})
            }
            qty+=1;
        }
        else{
            if(qty==1){
                let deleteCart = await cartModel.deleteOne({_id:data.cartId})
                return res.json({'success': true})   
            }
            qty-=1;
        }
        let updateCart = await cartModel.updateOne({_id:data.cartId},{$set:{
            quantity : qty
        }})
        console.log('POST /cartUpdate updated cart : ' + data.cartId);
    }
    return res.json({'success':true})
}
const deleteCart = async (req,res)=>{
    let data = req.body;
    let cartId = await cartModel.findOne({_id:data.cartId});
    if(cartId){
        let deleteCart = await cartModel.deleteOne({_id:data.cartId})
        console.log('DELETE /deleteCart deleted cart : ' + data.cartId);
    }
    return res.json({'success':true})
}

module.exports = {getCart,updateCart,deleteCart}