
const BASE_URL = process.env.REACT_APP_BASE_URL

export const  endPoints = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",

    SENDOTP_API :BASE_URL +"/password/sendotp",
    RESETPASSWORD_API: BASE_URL + "/password/reset",
}