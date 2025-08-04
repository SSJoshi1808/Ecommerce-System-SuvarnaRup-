import React from 'react'
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-gray-500 p-4 bg-gray-50 rounded-lg text-center">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
      {products.map((product, index) => {
        // Reconstruct image URL from img[0] if it's split
        let imageUrl = '';
        if (product.img && Array.isArray(product.img) && product.img.length > 0) {
          const imgObject = product.img[0];
          imageUrl = Object.values(imgObject).join('');
        }

        return (
          <Link 
            key={index} 
            to={`/product/${product._id}`} 
            className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className='p-3 sm:p-4'>
              <div className="aspect-square w-full mb-3 sm:mb-4 overflow-hidden rounded-md bg-gray-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name || 'Product Image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm text-gray-500">No image</span>
                  </div>
                )}
              </div>
              <h3 className='text-sm sm:text-base font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2'>
                {product.name}
              </h3>
              <p className='text-gray-900 font-semibold text-sm sm:text-base'>
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductGrid;
