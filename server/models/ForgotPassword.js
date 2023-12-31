const mongoose = require('mongoose');
const mailSender = require('../config/mailSender');

// forgotPasswordSchema , it ensures that it get deleted after 5 min
const forgotPasswordSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt: { 
        type: Date, 
        expires: '5m', 
        default: Date.now 
    }

});


// util function to calling mailsender which sends mail to user
const sendMail=async(email , otp)=>{
    try {
        const mailResponse = await mailSender(email  , otp , "Reset Password OTP");
        console.log("Email send successfully Reset Password OTP")
    }
    catch (error) {
        console.log("Error while sending verification mail : " , error) ;
        throw error;
    }
}

// it is used to do particular task before saving doc to collection
forgotPasswordSchema.pre("save" , async function(next){
    await sendMail(this.email , this.otp);
    next();
})

module.exports = mongoose.model("ForgotPassword" , forgotPasswordSchema);