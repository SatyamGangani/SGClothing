const express = require('express');

const router = express.Router();

const { userOrders,singleOrderDetail } = require('../controller/orderController');

router.get('/',userOrders);

router.get('/singleOrderDetail',singleOrderDetail);

module.exports = router;
