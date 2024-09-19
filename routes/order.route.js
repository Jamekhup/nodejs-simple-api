const express = require('express');
const router = exporess.Router();
const {getOrder,createOrder} = require('../controllers/order.controller.js');

router.get('/orders',getOrder);
router.post('/orders',createOrder);

module.exports = router;