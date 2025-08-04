import React, { useState, useEffect } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Serachbar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearchToggle = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            setSearchResults([])
            setSearchTerm("")
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:9000/api/products/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchResults(response.data || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }

    const getImageUrl = (imgArray) => {
        if (!imgArray || !Array.isArray(imgArray) || imgArray.length === 0) return null;
        
        const firstImage = imgArray[0];
        if (typeof firstImage === 'string') return firstImage;
        
        if (typeof firstImage === 'object') {
            return Object.values(firstImage).join('');
        }
        
        return null;
    };

    return (
        <div className={`flex items-center justify-center w-full transition-all duration-400 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 sm:h-32 z-50" : "w-auto"}`}>
            {isOpen ? (
                <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full px-4'>
                    <div className='relative w-full max-w-md'>
                        <input 
                            type="text"
                            placeholder='Search products...' 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='bg-gray-100 px-4 py-2 pl-4 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700 text-sm sm:text-base'
                        />
                        {/* Search Icon */}
                        <button 
                            type="submit" 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 p-1"
                        >
                            <HiMagnifyingGlass className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                    {/* close button */}
                    <button 
                        type="button"  
                        onClick={handleSearchToggle}
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 p-1 hover:bg-gray-100 rounded-full'
                    >
                        <HiMiniXMark className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    
                    {/* Search Results Dropdown */}
                    {(searchResults.length > 0 || loading) && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                            {loading ? (
                                <div className="p-4 text-center text-gray-500">
                                    Searching...
                                </div>
                            ) : (
                                <div className="py-2">
                                    {searchResults.map((product) => (
                                        <Link
                                            key={product._id}
                                            to={`/product/${product._id}`}
                                            onClick={handleSearchToggle}
                                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-12 h-12 flex-shrink-0">
                                                <img
                                                    src={getImageUrl(product.img) || '/placeholder.jpg'}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    ₹{product.price?.toLocaleString()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </form>
            ) : (
                <button onClick={handleSearchToggle} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <HiMagnifyingGlass className='h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6' />
                </button>
            )}
        </div>
    )
}

export default Serachbar