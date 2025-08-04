import React, { useEffect } from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';

const CartContent = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCart({ userId: user?._id, guestId }));
  }, [dispatch, user?._id, guestId]);

  const handleQuantityChange = (product, operation) => {
    let newQuantity = product.quantity;

    if (operation === 'increment') {
      // Prevent excessive quantities
      if (newQuantity < 99) {
        newQuantity++;
      }
    } else if (operation === 'decrement') {
      // Ensure quantity stays at least 1
      if (newQuantity > 1) {
        newQuantity--;
      }
    }

    if (newQuantity !== product.quantity) {
      dispatch(updateCartItemQuantity({
        productId: product.productId,
        quantity: newQuantity,
        category: product.category,
        collections: product.collections,
        guestId,
        userId: user?._id
      }));
    }
  };

  const handleRemoveItem = (product) => {
    dispatch(removeFromCart({
      productId: product.productId,
      category: product.category,
      collections: product.collections,
      guestId,
      userId: user?._id
    }));
  };
  const getImageUrl = (imgArray) => {
    if (!imgArray || !Array.isArray(imgArray) || imgArray.length === 0) return null;
  
    const firstImage = imgArray[0];
  
    // Handle object with _id and numbered properties (0, 1, 2, etc.)
    if (typeof firstImage === 'object' && !Array.isArray(firstImage) && '_id' in firstImage) {
      // Filter out the _id property and join the remaining characters
      const chars = Object.entries(firstImage)
        .filter(([key]) => key !== '_id')
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([_, value]) => value);
      return chars.join('');
    }
  
    // Handle regular string URL
    if (typeof firstImage === 'string') {
      return firstImage;
    }
  
    return null;
  };
  
  
  const calculateTotal = () => {
    return cart?.products?.reduce((total, product) => total + (product.price * product.quantity), 0) || 0;
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (!cart?.products || cart.products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm sm:text-base">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart?.products?.map((product) => (
        <div key={product.productId} className='flex items-start justify-between py-3 sm:py-4 border-b border-gray-100'>
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
            <img 
              src={getImageUrl(product.img)}
              alt={product.name || 'Product Image'} 
              className='w-16 h-16 sm:w-20 sm:h-24 object-cover rounded-lg flex-shrink-0'
              onError={(e) => e.target.src = '/placeholder.jpg'}
            />

            <div className="flex-1 min-w-0">
              <h3 className='text-sm sm:text-base font-medium text-gray-900 truncate'>{product.name}</h3>
              <p className='text-xs sm:text-sm text-gray-500 mt-1'>
                ₹{product.price.toLocaleString()}
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                {product.category} - {product.collections}
              </p>
              <p className='text-xs sm:text-sm text-gray-600 mt-1'>
                Qty: {product.quantity}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <p className='font-medium text-sm sm:text-base'>₹{(product.price * product.quantity).toLocaleString()}</p>
            <button 
              onClick={() => handleRemoveItem(product)}
              className='p-1 hover:bg-red-50 rounded-full transition-colors'
            >
              <RiDeleteBin3Line className='h-4 w-4 sm:h-5 sm:w-5 text-red-600' />
            </button>
          </div>
        </div>
      ))}
      {cart?.products?.length > 0 && (
        <div className='pt-4 border-t border-gray-200'>
          <p className='text-lg sm:text-xl font-bold text-right'>Total: ₹{calculateTotal().toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CartContent;