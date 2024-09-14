const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Please enter product name'] },
    price: { type: Number, required: [true, 'Product price is required'], default: 0},
    quantity: { type: Number, required: [true, 'Product Quantity is required'], default:0 },
    image: { type: String, required: false},
},
{timestamps: true}
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;