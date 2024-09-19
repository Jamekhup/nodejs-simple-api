const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please enter category name'], 
        unique: true 
    },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;