const express = require('express');
const router = express();
const {productModel} = require('../models/product');
const {categoryModel} = require('../models/category');
const {singleProductPreview,shopProductCateg,addToCart} = require('../controller/shopController')

// router.get('/',async (req,res)=>{
//     let data = await productModel.find();
//     return res.render('shop',{'products':data});
// })

router.get('/',async (req,res)=>{
    let productData = await productModel.find();
    let categoryData = await categoryModel.find();
    return res.render('shopSideBar',{'products':productData,'category':categoryData});
})

router.get('/productCateg',shopProductCateg)

router.get('/preview',singleProductPreview)

router.post('/addToCart',addToCart)

// router.get('/userCart',getCart);

module.exports = router;