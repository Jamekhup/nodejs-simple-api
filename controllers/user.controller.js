const User = require('../models/user.model.js');


const Register = async (req, res) => {

}

const verifyAccount = async (req, res) => {

}

const login = async (req, res) => {

}

const forgotPassword = async (req, res) => {

}

const resetPasswords = async (req, res) => {

}

const logout = async (req, res) => {
    req.user.tokens = req.user.tokens.filter((token) => token.token!== req.token);
    await req.user.save();
    res.send();
}


module.expots = {
    Register,
    verifyAccount,
    login,
    forgotPassword,
    resetPasswords,
    logout,
}
