import React, { useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineUser} from 'react-icons/hi'
import { HiBars3, HiBars3BottomRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Serachbar from './Serachbar'
import Cartdrawer from '../layout/Cartdrawer'
import { IoMdClose } from 'react-icons/io'
const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const[navDrawerOpen,setNavDraweropen]=useState(false)

    const toggleNavDrawer=() => {
        setNavDraweropen(!navDrawerOpen)
    }
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
  return (
   <>
    <nav className='container mx-auto flex items-center justify-between py-4 px-4 sm:px-6'>
        {/* Left Logo */}
        <div>
            <Link to="/" className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-wide drop-shadow-lg hover:scale-105 transition-transform">SuvarnaRup</Link>
        </div>
        {/* center - navigation link */}
        <div className='hidden lg:flex space-x-6'>
            <Link to="/collections/all" className='text-grey-700 hover:text-black text-sm font-medium uppercase'>
              Silver Jewellery 
            </Link>
            <Link to="/collections/all" className='text-grey-700 hover:text-black text-sm font-medium uppercase'>
                1 Gram Gold Jewellery
            </Link>
            <Link to="/collections/all" className='text-grey-700 hover:text-black text-sm font-medium uppercase'>
               Top Trending
            </Link>


        </div>
        {/* Right - Icons */}
        <div className='flex items-center space-x-3 sm:space-x-4'>
        <Link to="/admin" className="bg-black px-2 py-1 rounded text-xs text-white hover:bg-gray-800 transition-colors">
        Admin</Link> 
            <Link to="/profile" className='hover:text-black'>
                <HiOutlineUser  className='h-5 w-5 sm:h-6 sm:w-6 text-gray-700'/>
            </Link>
            <button onClick={toggleCartDrawer} className='relative hover:text-black'>
                 <HiOutlineShoppingBag  className='h-5 w-5 sm:h-6 sm:w-6 text-gray-700'/>
                 <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] flex items-center justify-center'>
                    {useSelector((state) => state.cart.cart?.products?.length || 0)}
                 </span>
            </button>
            {/* Search */}
            <div className='hidden sm:block overflow-hidden'>
            <Serachbar />
            </div>
           
            <button onClick={toggleNavDrawer}  className='lg:hidden'>
                <HiBars3BottomRight className='h-5 w-5 sm:h-6 sm:w-6 text-gray-700' />
            
            </button>
        </div>
    </nav>
    <Cartdrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

    {/* mobile navigation */}
    <div className={`fixed top-0 left-0 w-full sm:w-3/4 md:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold'>Menu</h2>
            <button onClick={toggleNavDrawer} className='p-2 hover:bg-gray-100 rounded-full'>
                <IoMdClose className='h-6 w-6 text-gray-600' /> 
            </button>
        </div>
        <div className='p-4'>
            <nav className='space-y-4'>
                <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black py-3 border-b border-gray-100 transition-colors' >
                Silver Jewellery
                </Link>
                <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black py-3 border-b border-gray-100 transition-colors' >
                1 Gram Gold Jewellery
                </Link>
                <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black py-3 border-b border-gray-100 transition-colors' >
                Top Trending
                </Link>
                <Link to="/admin" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black py-3 border-b border-gray-100 transition-colors' >
                Admin Panel
                </Link>
                <Link to="/profile" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black py-3 border-b border-gray-100 transition-colors' >
                My Profile
                </Link>
            </nav>
        </div>
    </div>
   </>
  )
}

export default Navbar