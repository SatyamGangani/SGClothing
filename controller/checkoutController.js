const {userModel} = require('../models/user');
const {cartModel} = require('../models/cart');
const {productModel} = require('../models/product');
const {orderModel} = require('../models/order');

const checkOutPage = async (req,res)=>{
    try {
        let user = req.query.userId;
        let userRec = await userModel.findOne({_id:user});
        if(userRec){
            let cartIds = await cartModel.find({user})
            .populate({path : 'product',select : {'name':1,_id:1,primaryImage:1,price:1}});
            let totCartVal = 0;
            cartIds.forEach(ele=>totCartVal+=ele.quantity * ele.product.price);
            return res.render('checkout',{cartIds,totCartVal})
        }
        else{
            return res.render('error404')
        }
    } catch (error) {    
        return res.render('error404')
    }

}

const orderPlace = async (req,res)=>{
    let data = req.body;
    let user = await userModel.findOne({_id : data.user});
    if(user){
        let cart = await cartModel.find({user : data.user})
        .populate({path : 'product',select : {'name':1,_id:1,primaryImage:1,price:1}});
        ;
        if(cart){
            let totCartVal = 0;
            let items = [];
            let sizeObj = {
                'S' : 'size_s',
                'M' : 'size_m',
                'L' : 'size_l',
                'XL' : 'size_xl'
            };
            cart.forEach(ele=>{
                let item = {product : ele.product._id,quantity : ele.quantity,size : ele.size};
                totCartVal+=ele.quantity * ele.product.price;
                items.push(item);
            })
            console.log(items);
            cart.forEach(async ele=>{
                let productId = await productModel.findOne({_id:ele.product._id});
                let sizeQty = productId[sizeObj[ele.size]];
                if(ele.size=='S'){
                    let productQtyUpdate = await productModel.updateOne({_id:ele.product._id},{
                        $set : {
                            size_s : sizeQty - parseInt(ele.quantity)
                        }
                    });
                }
                else if(ele.size=='M'){
                    let productQtyUpdate = await productModel.updateOne({_id:ele.product._id},{
                        $set : {
                            size_m : sizeQty - parseInt(ele.quantity)
                        }
                    });
                }
                else if(ele.size=='L'){
                    let productQtyUpdate = await productModel.updateOne({_id:ele.product._id},{
                        $set : {
                            size_l : sizeQty - parseInt(ele.quantity)
                        }
                    });
                }
                else{
                    let productQtyUpdate = await productModel.updateOne({_id:ele.product._id},{
                        $set : {
                            size_xl : sizeQty - parseInt(ele.quantity)
                        }
                    });
                }
                let cartDelete = await cartModel.deleteOne({_id : ele._id});
            });
            let order = await orderModel.create({
                user : data.user,
                items : items,
                amount : totCartVal,
                address : data.user_address,
                zip_code : data.user_post_code,
                city : data.user_city,
                country : data.user_country,
                card_number : data.card_number,
            })
            let cartDelete = await cartModel.deleteMany({ user : data.user});
            console.log(`POST /orderPlace Order placed by ${user.name}`);
            return res.json({'success' : 'Order Placed.'})
        }
        else{
            return res.json({'error' : 'No cart found with user id.'})
        }
    }
    else{
        return res.json({'error':'No user founded.'});
    }
}

module.exports = {checkOutPage,orderPlace}