const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({

});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;