import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../services/operaions/authAPI';

const NavBar = () => {
    const { user } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        <div className='border-b-[1px] border-slate-700 h-20 flex items-center justify-evenly font-semibold text-cyan-50 text-xl'>
            <div >
                <Link to={'/'}>
                    <img src={logo} alt='' width={100} loading='lazy' />
                </Link>
            </div>

            <div className='flex gap-x-5 text-white'>
                <Link to={'/'}>
                    <div>Home</div>
                </Link>

                <Link to={'/'}>
                    <div>About Us</div>
                </Link>

                <Link to={'/'}>
                    <div>Contact Us</div>
                </Link>
            </div>

            <div className='flex gap-x-5 items-center'>
                {(!user && token == null) ? (
                    <>
                        <Link to={'/login'}>
                            <button className='border px-[12px] py-[8px] rounded'>
                                Login
                            </button>
                        </Link>

                        <Link to={'/signup'}>
                            <button className='border  px-[12px] py-[8px] rounded'>
                                signup
                            </button>
                        </Link>
                    </>

                ) : (
                    <>
                        <Link to={'/dashboard'}>
                            <div>Dashboard</div>
                        </Link>

                        <Link to={'/'}>
                            <button onClick={() => {
                                dispatch(logout(navigate));
                            }}
                                className='border px-[12px] py-[8px] rounded'>
                                Logout
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
