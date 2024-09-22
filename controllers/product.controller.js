const { get } = require('mongoose');
const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');

const getProducts = async (req,res) => {
    // let getHost = await req.get('host');
    // return res.json(getHost);
    let filter = {};
    if(req.query.categories){
        filter = {category:req.query.categories.split(',')}
    }
    try {
        const products = await Product.find(filter).select('name image price category isFeatured').populate('category').sort({dateCreated : -1});
        return res.json({success: true, data: products});
    } catch (error) {
        return res.status(500).json({success:false, message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id).populate('category');
        return res.status(200).json({success: true, data: product});
    } catch (error) {
        return sres.status(500).json({ success: false, message: error.message });
    }
}

const createProduct = async (req, res) => {

    let category = await Category.findById(req.body.category);
    if(!category) return res.json({success:false, message: 'Category not found'});

    try {
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        });

        product = await product.save();
        if(!product) return res.json({success:false, message: 'Failed to save product'});
        return res.status(200).json({success: true, data: product});
        
    } catch (error) {
        return res.status(500).json({success: false, message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({success: true, data: product});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success:true, message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}