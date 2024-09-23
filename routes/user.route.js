const express = require('express');
const router = express.Router();
const {getUsers,Register,verifyAccount, login, forgotPassword, ResetPassword, logout} = require('../controllers/user.controller.js');

router.get('/users',getUsers);
router.post('/register',Register);
router.post('/verify-email/:token',verifyAccount);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', ResetPassword);
router.delete('/logout', logout);

module.exports = router;