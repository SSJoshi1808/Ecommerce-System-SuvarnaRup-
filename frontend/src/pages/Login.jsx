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
    <div className='flex'>
        <div className='w-full md:w-1/2 flex  flex-col justify-center items-center p-8 md:p-12'>
            <form 
            onSubmit={handleSubmit}
            action="" className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                <div className='flex justify-center mb-6'>
                    <h2 className='text-xl font-medium'>SuvarnaRup</h2>
                </div>
                <h2 className='text-2xl font-bold text-center mb-6'>
                    Hey There!!
                </h2>
                <p className='text-center mb-6'>
                    Enter Your Name and Password to login
                </p>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Email</label>
                    <input 
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter your Email' />
                </div>
                <div className='mb-4'>
                <label className='block text-sm font-semibold mb-2'>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter your Password' />
                </div>
                <div >
                    <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>
                        Sign In
                    </button>
                    <p className='mt-6 text-center text-sm '>
                        Don't have an Account ??
                        <Link to="/register" className='text-blue-500'>
                        Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
        <div className='hidden md:block w-1/2 bg-gray-800'>
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={login} alt="Login to Account " className=' h-[750px] w-full object-cover' />

            </div>
        </div>
    </div>
  )
}

export default Login