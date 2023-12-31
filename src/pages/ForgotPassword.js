import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import forgot from '../assets/forgot.jpg';
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { sendOtp } from '../services/operaions/authAPI';

const ForgotPassword = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email:''
            });
        }
    }, [reset, isSubmitSuccessful]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitContactForm = async (data) => {
        const {email} = data;
        try {
            dispatch(sendOtp( email , navigate));
        } catch (error) {
            console.log("error", error.message);
        }
    };

    return (
        <div className=' text-white flex justify-center items-center h-[90vh] '>
            <div className='flex justify-center items-center  gap-3 border-2  border-green-400 p-10 rounded-lg'>
                <form onSubmit={handleSubmit(submitContactForm)} className='w-96 text-slate-100 text-xl font-mo'>
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

                    <button className="rounded-md py-3 mt-5 text-center px-6 text-[16px] font-bold bg-lime-800 w-[100%]">
                        Verify
                    </button>

                </form>

                <div className=''>
                    <img src={forgot} width={300} alt=''>
                    </img>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword