const User = require('../models/user.model.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//for mail
// Looking to send emails in production? Check out our Email API/SMTP product!
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2250f99781eeab",
      pass: "8179612ef42d40"
    }
  });


//generate token
function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

const getUsers = async (req, res) => {
    try {

        let users = await User.find({isVerified: true}).select('-password -verifyToken').sort({created_at: -1});
        return res.json({success: true, data: users}); 
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const Register = async (req, res) => {

    const token = generateToken();

    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            verifyToken: token,
        });

        user = await user.save();

        if(user){

            let getHost = await req.get('host');
            const verificationLink = `${getHost}/verify-email/${token}`;
            //send mail
            const mailOptions = {
                from: 'test@gmail.com',
                to: req.body.email,
                subject: 'Verify Your Email Address',
                html: `
                    <h1>Email Verification</h1>
                    <p>Thank you for registering! Please click the link below to verify your email address:</p>
                    <a href="${verificationLink}">Verify Email</a>
                    <br><br>
                    <p>If you did not sign up, you can safely ignore this email.</p>
                    <p>Best regards,<br>Jame</p>
                `,
            };

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send('Error sending email: ' + error.message);
                }
                
            });

            res.status(200).json({
                success: true, 
                message: 'Registration was success. Check your email and verify your account', 
                name: user.name,
                email: user.email,
                token: user.verifyToken
            });
        }

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const verifyAccount = async (req, res) => {
    try {

        const user = await User.findOne({verifyToken: req.params.token}, {isVerified: false});
        if(!user) return res.status(404).json({message: 'User not found'});
        user.isVerified = true;
        user.verifyToken = null;
        await user.save();

        return res.status(200).json({success: true, message: 'Account verified successfully'});
        
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
}

const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email, isVerified: true});

    if(!user) return res.status(404).json({success:false, message: 'User not found'});

    if(user &&  bcrypt.compareSync(req.body.password, user.password)){
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, { expiresIn: '1d'});

        return res.status(200).json({success: true, name:user.name, email:user.email, token:token});
    }
    else{
        return res.status(400).json({success: false, message: 'Invalid credentials'});
    }

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
