import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import loginImg from '../assets/sign.png';
import { signUp } from '../services/operaions/authAPI';

const Signup = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: '',
                password: '',
                confirmPassword: '',
                userName: ''
            });
        }
    }, [reset, isSubmitSuccessful]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitContactForm = async (data) => {
        const { email, userName, password, confirmPassword } = data;
        try {
            dispatch(signUp(email, userName, password, confirmPassword, navigate));

        } catch (error) {
            console.log("error", error.message);
        }
    };

    return (
        <div className=' text-white flex justify-center items-center h-[90vh] '>
            <div className='flex justify-center items-center  gap-3 border-2  border-green-400 p-10 rounded-lg'>
                <form onSubmit={handleSubmit(submitContactForm)} className='w-96 text-slate-100 text-xl font-mo'>
                    <div className="flex gap-1 flex-col pt-3">
                        <label htmlFor="userName">User Name</label>
                        <input
                            name="userName"
                            id="userName"
                            type="text"
                            {...register("userName", {
                                required: "Please Enter User Name",
                            })}
                            className="text-black rounded-md  py-2"
                            placeholder="User Name"
                        />
                        {errors.userName && (
                            <span className='text-red-500'>{errors.userName.message}</span>
                        )}
                    </div>

                    <div className="flex gap-1 flex-col pt-3">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Please Enter Email ID",
                            })}
                            className="text-black  rounded-md py-2"
                            placeholder="Email Id"
                        />
                        {errors.email && (
                            <span className='text-red-500'>{errors.email.message}</span>
                        )}
                    </div>

                    <div className="flex gap-1 flex-col pt-3">
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

                    <button className="rounded-md py-3 mt-5 text-center px-6 text-[16px] font-bold bg-lime-800 w-[100%]">
                        SignUp
                    </button>

                </form>

                <div className=''>
                    <img src={loginImg} width={500} alt=''>
                    </img>
                </div>
            </div>
        </div>
    )
}

export default Signup