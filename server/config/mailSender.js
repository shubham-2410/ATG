

// controller for sending mail
const nodeMailer = require("nodemailer");

const mailSender = async (email , body , title)=>{
    try {
        const transport = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        let info = await transport.sendMail({
            from:"ATG Task1",
            to:email,
            subject:title,
            html:`${body}`,
        })

        return info;
    } 
    catch (error) {
        console.log("In mail Sender error is :" , error)
    }
}

module.exports = mailSender;