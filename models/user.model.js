const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    street:{
        type: String,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    country:{
        type: String,
        required: false
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;