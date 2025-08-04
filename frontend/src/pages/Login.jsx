import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import login from "../assets/login.jpeg"
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin/products');
            } else {
                navigate('/');
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({ email, password })).unwrap();
        } catch (err) {
            toast.error(err.message || 'Login failed');
        }
    }

  return (
    <div className='flex min-h-screen'>
        <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12'>
            <form 
            onSubmit={handleSubmit}
            action="" className='w-full max-w-md bg-white p-6 sm:p-8 rounded-lg border shadow-sm'>
                <div className='flex justify-center mb-4 sm:mb-6'>
                    <h2 className='text-lg sm:text-xl font-medium'>SuvarnaRup</h2>
                </div>
                <h2 className='text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6'>
                    Hey There!!
                </h2>
                <p className='text-center mb-4 sm:mb-6 text-sm sm:text-base'>
                    Enter Your Email and Password to login
                </p>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Email</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
                    placeholder='Enter your Email' />
                </div>
                <div className='mb-6'>
                <label className='block text-sm font-semibold mb-2'>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
                    placeholder='Enter your Password' />
                </div>
                <div >
                    <button type='submit' className='w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'>
                        Sign In
                    </button>
                    <p className='mt-4 sm:mt-6 text-center text-sm'>
                        Don't have an Account?{' '}
                        <Link to="/register" className='text-blue-500 hover:text-blue-700 transition-colors'>
                        Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
        <div className='hidden lg:block w-1/2 bg-gray-800'>
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={login} alt="Login to Account " className='h-full w-full object-cover' />
            </div>
        </div>
    </div>
  )
}

export default Login