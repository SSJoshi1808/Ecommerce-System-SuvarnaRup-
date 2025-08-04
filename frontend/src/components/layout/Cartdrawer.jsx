import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContent from '../cart/CartContent';
import { useNavigate } from 'react-router-dom';

const Cartdrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate=useNavigate();
    const handleCheckOut=()=>{
        toggleCartDrawer();
        navigate("/CheckOut");

    }
    return (

            <div 
            className={`fixed top-0 right-0 w-full sm:w-3/4 md:w-2/3 lg:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 
                ${drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Close Button */}
                <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                    <h2 className='text-lg sm:text-xl font-semibold'>Your Cart</h2>
                    <button onClick={toggleCartDrawer} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                        <IoMdClose className='h-5 w-5 sm:h-6 sm:w-6 text-gray-600' />
                    </button>                    
                </div>
                {/* Cart Contents with scrollable area */}
                <div className='flex-grow p-4 overflow-auto'>
                    {/* Component for Cart */   }
                    <CartContent />
                </div>
                {/* Checkout  button fixed at the bottom */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <button 
                    onClick={handleCheckOut}
                    className='w-full bg-black text-white py-3 sm:py-4 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors'>
                        CheckOut
                    </button>
                    <p className='text-xs sm:text-sm tracking-tighter text-gray-500 mt-2 text-center'>
                        Shipping, taxes and discount codes calculated at checkout
                    </p>
                </div>
           

                
            </div>
    );
};

export default Cartdrawer;
