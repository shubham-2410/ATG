
const express = require('express');

const resetRoute = express.Router();

const {sendOtp , resetPassword} = require('../controllers/resetPassword');

// routes for restpassword and sendotp
resetRoute.post('/sendotp' , sendOtp);
resetRoute.post('/reset' , resetPassword);

module.exports = resetRoute;