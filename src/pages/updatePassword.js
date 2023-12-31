import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {useDispatch} from 'react-redux';
import { useNavigate , useParams} from "react-router-dom";
import update from '../assets/update.png';

const {resetPassword} = require('../services/operaions/authAPI')

const UpdatePassword = () => {

    const email = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                password: '',
                confirmPassword: '',
                otp:''
            });
        }
    }, [reset, isSubmitSuccessful]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitContactForm = async (data) => {
        try {
            const {otp , password , confirmPassword} = data;
            dispatch(resetPassword(email.id , password , confirmPassword , otp , navigate));

        } catch (error) {
            console.log("error", error.message);
        }
    };

    return (
        <div className=' text-white flex justify-center items-center h-[90vh] '>
            <div className='flex justify-center items-center  gap-3 border-2  border-green-400 p-10 rounded-lg'>
                <form onSubmit={handleSubmit(submitContactForm)} className='w-96 text-slate-100 text-xl font-mo'>
                    <div className="flex gap-1 flex-col mt-3 py-2">
                        <div>Email : {email.id}</div>
                    </div>

                    <div className="flex gap-1 flex-col mt-3 ">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            type="text"
                            {...register("password", {
                                required: "Please Enter Password",
                            })}
                            className="text-black rounded-md py-2"
                            placeholder="password"
                        />
                        {errors.password && (
                            <span className='text-red-500'>{errors.password.message}</span>
                        )}
                    </div>

                    <div className="flex gap-1 flex-col pt-3">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            id="confirmPassword"
                            type="text"
                            {...register("confirmPassword", {
                                required: "Please Confirm Password",
                            })}
                            className="text-black rounded-md py-2"
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && (
                            <span className=' text-red-500'>{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <div className="flex gap-1 flex-col pt-3">
                        <label htmlFor="otp">OTP</label>
                        <input
                            name="otp"
                            id="otp"
                            type="number"
                            {...register("otp", {
                                required: "Please Enter OTP ",
                            })}
                            className="text-black rounded-md py-2"
                            placeholder="123456"
                        />
                        {errors.otp && (
                            <span className=' text-red-500'>{errors.otp.message}</span>
                        )}
                    </div>
                    <button className="rounded-md py-3 mt-5 text-center px-6 text-[16px] font-bold bg-lime-800 w-[100%]">
                        Reset
                    </button>

                </form>

                <div className=''>
                    <img src={update} width={550} alt=''>
                    </img>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword