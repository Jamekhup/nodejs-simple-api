const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please enter category name'], 
        unique: true 
    },
    icon:{
        type: String,
        default: ''
    },
    color:{
        type: String,
        default: ''
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;