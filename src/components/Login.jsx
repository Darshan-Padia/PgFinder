import React from 'react';
import { useRecoilState } from 'recoil';
import { roleState } from './Atom/RoleStateAtom';
import { useForm } from 'react-hook-form';
import Header from './Header';

const Login = () => {
    const [role, setRole] = useRecoilState(roleState);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Your login form submission logic here
        console.log('Role:', role);
        console.log('Email:', data.email);
        console.log('Password:', data.password);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div>
            <div className='absolute w-full'>
                <Header></Header>
            </div>
            <div className="bg-gradient-to-r from-slate-600 to-slate-900 min-h-screen bg-gray-50 flex flex-col md:flex-row">
                <div className="md:w-1/2 flex justify-center items-end bg-contain bg-center md:bg-center md:bg-cover" >
                    {/* Content here if needed */}
                    <img className='w-3/4 md:w-full' src="src/assets/signup_image_4.png" alt="" />
                </div>

                <div className="md:w-1/2 flex items-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 text-white">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold">Login to your account</h2>
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

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-300 hover:text-indigo-200">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                Don't have an account? <a href="/signup" className="font-medium text-indigo-300 hover:text-indigo-200">Sign up</a>
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