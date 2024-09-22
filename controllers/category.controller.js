const Category = require('../models/category.model.js');

const getCategories = async (req, res) => {
    try {
        let category = await Category.find({});
        if (category){
            return res.status(200).json({data: category});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const createCategory = async (req, res) => {

    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    category = await category.save();
    if(!category){
        return res.status(400).json({message: 'Failed to create category'});
    }
    return res.status(200).json({success: true, data: category});   
}

const updateCategory = async (req, res) => {
    try {
        let category = await Category.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!category){
            return res.status(404).json({message: 'category not found'});
        }
        res.status(200).json({success: true, data: category, message: 'category updated successfully'});
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
}

const deleteCategory = async (req, res) => {
    let deleteCategory = await Category.findByIdAndDelete(req.params.id);
    if(!deleteCategory) return res.status(404).json({success: false, message: 'category not found'});
    return res.status(200).json({success: true, message: 'category deleted successfully'});
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}