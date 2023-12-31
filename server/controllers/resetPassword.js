const user = require("../models/user");
const otpGenerator = require("otp-generator");
const forgotPassword = require('../models/ForgotPassword');
const bcrypt = require('bcrypt');

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        //  // Ensuring that all feilds are present
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please fill required fields"
            })
        }

        // Checking weather user has account or not
        const isExist = await user.findOne({ email: email });

        if (!isExist) {
            return res.status(404).json({
                success: false,
                message: "Account Not Found",
            })
        }

        // if user has done multiple request to reset password , we will ensure that only latest otp will be accepted
        // deleting previous otp from db
        const alreadyRequest = await forgotPassword.findOneAndDelete({email:email});

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
 
        // forgotPassword.pre("Save ") method is used for sending otp
        // it ensures that otp is sent to user

        // creating new entry with new otp
        const otpDoc = await forgotPassword.create({
            email: email,
            otp: otp,
        })

        return res.status(200).json({
            success: true,
            email:email,
            userName:isExist.userName,
            message: "OTP send successfully"
        })
    }
    catch (error) {
        console.log("send otp error ", error)
        return res.status(500).json({
            success: false,
            message: "Send OTP error for reset password",
            error
        })
    }
}

const resetPassword = async (req , res)=>{
    try {
        const {email , otp , password , confirmPassword} = req.body;

        if(!email || !otp ||!password ||!confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Please fill required feilds",
            });
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword not match!!!",
            });
        }

        const isValidOtp = await forgotPassword.findOne({email:email});

        if(!isValidOtp){
            return res.status(408).json({
                success:false,
                message:"OTP expired , please try again",
            })
        }

        if(isValidOtp.otp!=otp){
            return res.status(401).json({
                success:false,
                message:"Wrong OTP",
            })
        }

        const hashPassword = await bcrypt.hash(password , 10);

        const updatePassword = await user.findOneAndUpdate({email:email} ,{ password : hashPassword});

        return res.status(200).json({
            success:true,
            message:"Password Updated Successfully",
        })
    } 
    catch (error) {
        console.log("Error during reset password : ", error);
        return res.status(500).json({
            success:false,
            message:"Failure during reset password !!"
        });
    }
}


module.exports = {
    sendOtp,
    resetPassword,
}