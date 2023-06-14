const express = require('express');
const {getCart,updateCart,deleteCart} = require('../controller/cartController');

const router = express.Router();

router.get('/',(req,res)=>{
    return res.render('cartTable')
})

router.get('/userCart',getCart);

router.post('/updateCart',updateCart);

router.delete('/deleteCart',deleteCart);

module.exports = router;