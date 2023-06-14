const express = require('express');
const {checkOutPage,orderPlace} = require('../controller/checkoutController')


const router = express.Router();

router.get('/',checkOutPage);

router.post('/orderPlace',orderPlace);

router.get('/confirmation',(req,res)=>{
    res.render('confirmation')
})

module.exports = router;