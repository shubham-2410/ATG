import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import loginImg from '../assets/login.jpg';
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { login } from '../services/operaions/authAPI';
const Login = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                userName: '',
                password: '',
            });
        }
    }, [reset, isSubmitSuccessful]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitContactForm = async (data) => {
        try {
            const {userName , password} = data;
            dispatch(login(userName , password , navigate));

        } catch (error) {
            console.log("error", error.message);
        }
    };

    return (
        <div className=' text-white flex justify-center items-center h-[90vh] '>
            <div className='flex justify-center items-center  gap-3 border-2  border-green-400 p-10 rounded-lg'>
                <form onSubmit={handleSubmit(submitContactForm)} className='w-96 text-slate-100 text-xl font-mo'>
                    <div className="flex gap-1 flex-col mt-3 ">
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

                    <Link to={'/forgot-password'}>
                        <div className=' text-blue-800 mt-3 text-lg'>Forgot Password ?</div>
                    </Link>

                    <button className="rounded-md py-3 mt-5 text-center px-6 text-[16px] font-bold bg-lime-800 w-[100%]">
                        Login
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

export default Login