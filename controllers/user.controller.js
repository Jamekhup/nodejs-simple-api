const User = require('../models/user.model.js');


const getUsers = async (req, res) => {
    try {

        let users = await User.find({}).sort({created_at: -1});
        return res.json({success: true, data: users}); 
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const Register = async (req, res) => {
}

const verifyAccount = async (req, res) => {

}

const login = async (req, res) => {

}

const forgotPassword = async (req, res) => {

}

const ResetPassword = async (req, res) => {

}

const logout = async (req, res) => {
  
}


module.exports = {
    getUsers,
    Register,
    verifyAccount,
    login,
    forgotPassword,
    ResetPassword,
    logout,
}
