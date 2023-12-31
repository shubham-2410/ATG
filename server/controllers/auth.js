const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signUp = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body;

        // Ensuring that all feilds are present
        if (!userName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please fill required fields",
            })
        }

        // Checking for password and confirmpassword are same
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password not matched",
            })
        }

        // trying to fetch user from db using username as no duplicate username allowed
        const alreadyUserName =await User.findOne({ userName: userName });

        if (alreadyUserName) {
            return res.status(400).json({
                success: false,
                message: "UserName already used !!!",
            })
        }

        // One email can create one user , confirming that email is not already used
        const alreadyEmail =await User.findOne({ email: email });

        if (alreadyEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already used !!!",
            })
        }

        // For security purpose encrypting password before storing it to db
        const hashPassword = await bcrypt.hash(password , 10)

        // we can also check weather email belong to same user by verifying email
        // by sending otp , ask to enter correct otp

        // creating new user
        const newUser = await User.create({
            userName : userName,
            email:email,
            password:hashPassword
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully"
        })

    }
    catch (error) {
        console.log("Error : " , error)
        return res.status(500).json({
            success:false,
            message:"Error during SignUp ", 
            error:error
        })
    }
}

const login = async (req , res)=>{
    try {
        const {userName , password} = req.body;

        console.log(userName , password)
         // Ensuring that all feilds are present
        if(!userName || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill required feilds",
            })
        }

        // Trying to fetch user from db , using giving credentials
        const isExist = await User.findOne({userName:userName});

        if(!isExist){
            return res.status(404).json({
                success:false,
                message:"SignUp first !!!",
            })
        }

        // Checking weather password is right or not
        const isMatch = await bcrypt.compare(password , isExist.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Wrong Password"
            })
        }

        const payload = {
            userName: userName,
            id: isExist._id,
        }
        
        // creating jwt token , it ensure security
        const token =jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h'});

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Expires in 3 days
            httpOnly: true,
        };
        
        isExist.password=undefined;
        //cookie is added , so that user need not to login again and again
        res.cookie("token" , token , options ).status(200).json({
            success: true,
            message: "Login Successfull",
            user:isExist,
            token:token,
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Login Failure , please try again!!",
            error,
        })
    }
}

module.exports={
    signUp ,
    login,
}