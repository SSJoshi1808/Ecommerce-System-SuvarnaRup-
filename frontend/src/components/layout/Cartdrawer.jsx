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
            className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 
                ${drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Close Button */}
                <div className='flex justify-end p-4'>
                    <button onClick={toggleCartDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                        </button>                    
                </div>
                {/* Cart Contents with scrollable area */}
                <div className='flex-grow p-4 overflow-auto'>
                    <h2 className='text-xl font-samibold mb-4'> Your cart </h2>
                    {/* Component for Cart */   }
                    <CartContent />
                </div>
                {/* Checkout  button fixed at the bottom */}
                <div className="p-4 bg-white sticky bottom-0">
                    <button 
                    onClick={handleCheckOut}
                    className='w-full bg-black text-white py-3 rounded-lg font-samibold  hover:bg-gray-800 transition'>
                        CheckOut
                    </button>
                    <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
                        Shipping , taxes and Discount codes calculated at checkouut
                    </p>
                </div>
           

                
            </div>
    );
};

export default Cartdrawer;
