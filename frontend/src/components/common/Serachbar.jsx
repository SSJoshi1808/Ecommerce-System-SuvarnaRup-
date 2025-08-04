import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'


const Serachbar = () => {
    const [searchTerm ,setSeatchTerm ] = useState("")
    const [ isOpen ,setIsOpen]=useState(false)
    const handleSerachToggle=()=>{
        setIsOpen(!isOpen)
    }
    const handleSerach=(e)=>{
        e.preventDefault();
        console.log("Search Data",searchTerm);
        setIsOpen(false)
        
    }  
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-400 ${isOpen? "absolute top-0 left-0 w-full bg-white h-24 sm:h-32 z-50" :"w-auto"}`}>
        {isOpen ? (
            <form onSubmit={handleSerach} className='relative flex items-center justify-center w-full px-4'>
                <div className='relative w-full max-w-md'>
                <input type="text"
                 placeholder='Search products...' 
                 value={searchTerm} 
                 onChange={e=>setSeatchTerm(e.target.value)}
                 className='bg-gray-100 px-4 py-2 pl-4 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700 text-sm sm:text-base'/>
                {/* Search Icon */}
                <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 p-1"
                >
                <HiMagnifyingGlass className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                    
                </div>
                {/* close button */}
                    <button type="button"  
                    onClick={handleSerachToggle}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 p-1 hover:bg-gray-100 rounded-full'>
                        <HiMiniXMark className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
            </form>) : (
            <button onClick={handleSerachToggle} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <HiMagnifyingGlass className='h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6' />
            </button>
        )}
    </div>
  )
  
}

export default Serachbar