const express = require('express');
const router = express.Router();
const {Register,verifyAccount, login, forgotPassword, resetPassword, logout} = require('../controllers/user.controller.js');

router.post('/register',Register);
router.post('/verify-account',verifyAccount);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.delete('/logout', logout);

module.exports = router;