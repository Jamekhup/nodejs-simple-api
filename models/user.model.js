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
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
        required: false,
    },

    isVerified:{
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
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            return ret;
        }
    },
    toObject: {
        transform: (doc, ret) => {
            delete ret.password; 
            return ret;
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;