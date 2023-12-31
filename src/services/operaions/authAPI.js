import {toast} from 'react-hot-toast';
import { setUser , setToken } from '../../redux/slices/authSlice';

const {apiConnector} = require('../apiconnector')
const {endPoints} = require('../apis')

const {
    SIGNUP_API,
	LOGIN_API,
	SENDOTP_API,
	RESETPASSWORD_API,
} = endPoints;

export function signUp(email ,userName ,  password , confirmPassword ,  navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", SIGNUP_API, {
				userName,
				email,
				password,
				confirmPassword,
			});
			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success("SignUp Successfull");
			navigate('/login');
		}
		catch (error) {
			console.log("Error in signup...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}

export function login(userName , password , navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", LOGIN_API, {
				userName,
				password,
			});

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			dispatch(setToken(response.data.token));
			dispatch(setUser({ ...response.data.user }));

			localStorage.setItem("user", JSON.stringify(response.data.user));
			localStorage.setItem("token" , JSON.stringify(response.data.user.token));

			toast.success("Login Successfull");
			navigate('/dashboard')
		}
		catch (error) {
			console.log("Error in signup...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}

export function sendOtp(email ,  navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", SENDOTP_API, {
				email,
			});
			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success("OTP Send");
			navigate(`/update-password/${response.data.email}`);
		}
		catch (error) {
			console.log("Error during sending otp...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}

export function resetPassword(email , password , confirmPassword, otp, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading("Loading")

		try {
			const response = await apiConnector("POST", RESETPASSWORD_API, {
				email,
				password,
				confirmPassword,
				otp,
			});
			if (!response.data.success) {
				throw new Error(response.data.message);
			}
			toast.success("Password Updated Successfully");
			navigate('/login');
		}
		catch (error) {
			console.log("Error during password update...", error);
			toast.error(error.response.data.message);
		}
		toast.dismiss(toastId);
	}
}


export function logout(navigate) {
	return (dispatch) => {
		dispatch(setUser(null))
		dispatch(setToken(null))
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		toast.success("Logged Out")
		navigate("/")
	}
}
