const express = require('express');
const path = require('path');
const {newProduct,allProduct,deleteProduct,getSingleProduct,updateProduct} = require('../controller/productController')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './productImg')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  })

  var upload = multer({ storage: storage });


const router = express.Router();

router.get('/addProduct',(req,res)=>{
    res.render('product')
})

router.post('/newProduct',upload.fields([{name:'primaryImage',maxCount:1},{name:'secondaryImage',maxCount:1}]),newProduct);

router.get('/list',(req,res)=>{
    return res.render('productTable')
})

router.get('/allProductData',allProduct)

router.delete('/deleteProduct',deleteProduct)

router.get('/getProduct',getSingleProduct)

router.put('/updateProduct',upload.fields([{name:'primaryImage',maxCount:1},{name:'secondaryImage',maxCount:1}]),updateProduct)

module.exports = router;