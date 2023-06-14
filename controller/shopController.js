const {productModel} = require('../models/product');
const {categoryModel} = require('../models/category');
const {userModel} = require('../models/user');
const {cartModel} = require('../models/cart');


const singleProductPreview = async (req,res)=>{
    let data = await productModel.findOne({_id:req.query.id}).populate({
        path:'category',
        select:{'name':1,'_id':0}
    });
    if(data){
        console.log(`GET /preview Product: ${data.name}`);
        return res.render('singleProduct',{data})
    }
    else{
        return res.render('error404')
    }
}

const shopProductCateg = async (req,res)=>{
    let reqCategory = req.query.categoryId;
    if(reqCategory=='allCategories'){
        let data = await productModel.find();
        console.log(`GET /productCateg Category : All`);
        return res.json(data)
    }
    try {
        let category = await categoryModel.findOne({_id : req.query.categoryId})
        let data = await productModel.find({category:category._id});
        return res.json(data)
    } catch (error) {
        return res.json({'data':[]});
    }
}

const addToCart = async (req,res)=>{
    let data = req.body;
    let userId = await userModel.findOne({_id:data.userId});
    if(userId){
        let orderProductId = data.productId;
        let orderUserId = data.userId;
        let orderQty = data.productQty;
        let orderSize = data.productSize;

        let productId = await productModel.findOne({_id:orderProductId});
        if(productId){
            let sizeObj = {
                'S' : 'size_s',
                'M' : 'size_m',
                'L' : 'size_l',
                'XL' : 'size_xl'
            };
            let sizeQty = productId[sizeObj[orderSize]];
            if(sizeQty>data.productQty){
                let existCartId = await cartModel.findOne({user : orderUserId, product : orderProductId,size:orderSize});
                if(! existCartId){
                    let cartId = await cartModel.create({
                        user : orderUserId,
                        product : orderProductId,
                        size : orderSize,
                        quantity : orderQty
                    })
                    console.log(`${productId.name} added by ${userId.name}`);
                }
                else{
                    if(sizeQty>=existCartId.quantity + parseInt(orderQty)){
                        let updateCart = await cartModel.updateOne({_id:existCartId._id},{
                            quantity : existCartId.quantity + parseInt(orderQty)
                        })
                        console.log(`${productId.name} added by ${userId.name}`);
                    }
                    else{
                        return res.json({'error':'Your Cart qty for selected product is greater than available..'})
                    }
                }

            }
            else{
                return res.json({'error' : 'Entered qty is greater than available..'})
            }
            console.log(productId);

        }
        else{
            return res.json({'error' : 'Product not found.'})
        }
    }
    else{
        return res.json({'error':'User not founded..'})
    }
    // console.log(data);
    return res.json({'success':true});
}


module.exports = {singleProductPreview,shopProductCateg,addToCart};