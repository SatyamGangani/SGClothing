const {orderModel} = require('../models/order')

const userOrders = async (req,res) =>{
    data = req.query;
    let orders = await orderModel.find({user:data.user})
    let ordersArr = [];
    orders.forEach(ele=>{
        ordersArr.push({
            _id : ele._id,
            noOfItems : ele.items.length,
            amount : ele.amount,
            orderDate : ele.order_date.toLocaleDateString()
        });
        console.log(ele.order_date.toLocaleDateString());
    })
    // .populate({
    //    path :  'items.product',
    //    select : {'name' : 1,'primaryImage' : 1}
    // })
    // .populate('product')
    ;
    return res.render('order',{orders : ordersArr})
}

const singleOrderDetail = async (req,res)=>{
    let orderId = req.query;
    if(orderId){
        let orderData = await orderModel.findOne({_id : orderId.order})
        .populate({path : 'items.product',select : {'name':1,primaryImage:1,price:1}})
        if(orderData){
            return res.json({orderData})
        }
        else{
            return res.json({'error':'No order id found.'});
        }
    }
    else{
        return res.json({'error':'No order id found.'});
    }
    return res.json({'success':true});
}


module.exports = {userOrders,singleOrderDetail}