const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Product name is required']
    },
    description:{
        type: String,
        required: [true, 'Product description is required']
    },
    richDescription:{
        type: String,
        default: ''
    },
    image:{
        type: String,
        default: ''
    },
    images:[{
        type: String,
        default: ''
    }],
    brand:{
        type: String,
        required: [true, 'Product brand is required']
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock:{
        type: Number,
        required: true,
        min:0,
        max:255
    },
    rating:{
        type: Number,
        default: 0,
        min:0,
        max:5
    },
    numReviews:{
        type: Number,
        default: 0,
        min:0
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

ProductSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

ProductSchema.set('toJson',{
    virtuals: true,
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;