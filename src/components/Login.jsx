import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { roleState } from './Atom/RoleStateAtom';
import { useForm } from 'react-hook-form';
import Header from './Header';
// import axios, { axiosPrivate } from '../api/axios';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { authState } from './Atom/AuthStateAtom';
import { Link } from 'react-router-dom';
// import { axiosPrivate } from '../api/axios';
// import LandingPage from './components/LandingPage';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const checkLogin = async () => {
            try {
                const response = await axiosPrivate.get('/api/auth/checkLoggedIn', {
                    signal: controller.signal
                });
                console.log(response.data);
                if (isMounted) {
                    navigate('/', { replace: true });
                }
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        checkLogin();    

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    const navigate = useNavigate();
    const navigateToLandingPage = () => {
        navigate('/');
    }

    const rolee = useRecoilState(roleState);
    const { auth, setAuth } = useContext(AuthContext);
    const [authh, setAuthh] = useRecoilState(authState);
    const [role, setRole] = useState("tenant");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        console.log(role);
        try {
            const response =
                await axios.post(
                    '/api/auth/login',
                    {
                        email: data.email,
                        password: data.password,
                        role: role,
                    },

                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                )
                    .then((response) => {
                        console.log(response.data);
                        console.log(response.data);
                        const accessToken = response.data.accessToken;
                        const refreshToken = response.data.refreshToken;
                        const role = response.data.role;
                        setAuth({
                            // getting email
                            email: data.email,
                            // getting role
                            role: role,
                            // setting accessToken
                            accessToken: accessToken,
                            // setting refreshToken
                            refreshToken: refreshToken,
                            // password
                            password: data.password,
                        });
                        


                        console.log(authh);
                        alert('Login successful');
                        navigateToLandingPage();

                    }
                    )
        } catch (error) {
            console.log(error);
            if (!error?.response) {
                console.log('Network error');

            } else {
                console.log(error.response.data);
            }

        }
        // setAuth({
        //     email: 'email',
        //     role: 'owner',
        //     accessToken: 'accessToken',
        //     refreshToken: 'refreshToken',
        //     password: 'password'

        // });
        // console.log(auth);
        // navigateToLandingPage();


    };

    useEffect(() => {
        console.log('authh');
        console.log(authh);
        console.log('role');
        console.log(rolee);

    }, [authh]);


    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div>
            <div className='fixed w-full'>
                <Header></Header>
            </div>
            <div className=" bg-gradient-to-r from-slate-600 to-slate-900  min-h-screen bg-gray-50 flex flex-col md:flex-row">
                <div className="  md:w-3/4 flex justify-center items-end bg-contain bg-center" >
                    {/* Content here if needed */}
                    <img className='  w-3/4' src="src/assets/signup_image_4.png" alt="" srcSet="" />
                </div>

                <div className="md:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 text-white">
                        <div className='flex justify-start' >
                            <h2 className="mt-6 text-amber-400 text-center text-6xl font-extrabold">Login</h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="flex flex-col gap-2 rounded-lg shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        type="email"
                                        {...register('email', { required: true })}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-500 border border-gray-300 placeholder-gray-300 text-gray-100 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                    {errors.email && <span className="text-red-500">Email is required</span>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        {...register('password', { required: true })}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 bg-slate-500 border border-gray-300 placeholder-gray-300 text-gray-100 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                    {errors.password && <span className="text-red-500">Password is required</span>}
                                </div>
                            </div>

                            <div className="flex flex-row gap-2">
                                <span className="text-white">Select Role:</span>
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio" name="role" value="owner" checked={role === 'owner'} onChange={handleRoleChange} />
                                    <span className="ml-2">Owner</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" className="form-radio" name="role" value="tenant" checked={role === 'tenant'} onChange={handleRoleChange} />
                                    <span className="ml-2">Tenant</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                                        Remember me
                                    </label>
                                </div>
                                {/* go to "/testpage" */}
                                <Link
                                    to="/testpage"
                                    className="font-medium text-indigo-300 hover:text-indigo-200"
                                >
                                    tespage
                                </Link>


                                <div className="text-sm">
                                    <Link to="/forgotpassword" className="font-medium text-indigo-300 hover:text-indigo-200">

                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                Don't have an account? 
                                <Link to="/signup" className="font-medium text-indigo-300 hover:text-indigo-200">
                                    Signup
                                </Link>
                            </div>

                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
