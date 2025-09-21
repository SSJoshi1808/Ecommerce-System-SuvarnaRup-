import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import { useLocation } from 'react-router-dom';

const Myorder = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    // Refresh orders when coming from order confirmation page
    useEffect(() => {
        if (location.state?.orderCreated) {
            dispatch(fetchUserOrders());
        }
    }, [location.state, dispatch]);

    const getImageUrl = (imgArray) => {
        if (!imgArray || !Array.isArray(imgArray) || imgArray.length === 0) return null;
        
        const firstImage = imgArray[0];
        if (typeof firstImage === 'string') return firstImage;
        
        if (typeof firstImage === 'object') {
            return Object.values(firstImage).join('');
        }
        
        return null;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'bg-yellow-100 text-yellow-700';
            case 'Shipped':
                return 'bg-blue-100 text-blue-700';
            case 'Delivered':
                return 'bg-green-100 text-green-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className='max-w-7xl mx-auto p-4 sm:p-6'>
                <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
                <div className='flex justify-center items-center py-12'>
                    <div className='text-center'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4'></div>
                        <p className='text-gray-600'>Loading your orders...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='max-w-7xl mx-auto p-4 sm:p-6'>
                <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
                <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <p className='text-red-600'>Error loading orders: {error}</p>
                </div>
            </div>
        );
    }

    const handleRefresh = () => {
        dispatch(fetchUserOrders());
    };

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl sm:text-3xl font-bold'>My Orders</h2>
                <button
                    onClick={handleRefresh}
                    className='flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                    </svg>
                    <span className='text-sm'>Refresh</span>
                </button>
            </div>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4 sm:py-4'>Image</th>
                            <th className='py-3 px-4 sm:py-4'>Order ID</th>
                            <th className='py-3 px-4 sm:py-4'>Created</th>
                            <th className='py-3 px-4 sm:py-4'>Shipping Address</th>
                            <th className='py-3 px-4 sm:py-4'>Items</th>
                            <th className='py-3 px-4 sm:py-4'>Price</th>
                            <th className='py-3 px-4 sm:py-4'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td className='py-3 px-4 sm:py-4'>
                                        {order.orderItem && order.orderItem.length > 0 ? (
                                            <img
                                                src={getImageUrl(order.orderItem[0].image) || '/placeholder.jpg'}
                                                alt={order.orderItem[0].name || 'Product'}
                                                className='w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg'
                                            />
                                        ) : (
                                            <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
                                                <span className='text-gray-400 text-xs'>No Image</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className='py-3 px-4 text-sm font-medium text-gray-900'>
                                        #{order._id.slice(-8).toUpperCase()}
                                    </td>
                                    <td className='py-3 px-4 text-sm'>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='py-3 px-4 text-sm'>
                                        <div>
                                            <p className='font-medium'>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                                            <p className='text-gray-500 text-xs'>{order.shippingAddress.postalCode}</p>
                                        </div>
                                    </td>
                                    <td className='py-3 px-4 text-sm'>
                                        <div>
                                            <p className='font-medium'>{order.orderItem?.length || 0} item(s)</p>
                                            {order.orderItem && order.orderItem.length > 0 && (
                                                <p className='text-gray-500 text-xs truncate max-w-32'>
                                                    {order.orderItem[0].name}
                                                    {order.orderItem.length > 1 && ` +${order.orderItem.length - 1} more`}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className='py-3 px-4 text-sm font-medium'>
                                        ₹{order.totalPrice?.toLocaleString()}
                                    </td>
                                    <td className='py-3 px-4'>
                                        <div className='flex flex-col space-y-1'>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status || 'Processing'}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='py-12 px-4 text-center'>
                                    <div className='flex flex-col items-center justify-center space-y-4'>
                                        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                                            <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-medium text-gray-900 mb-2'>You have no orders</h3>
                                            <p className='text-gray-500 mb-4'>Start shopping to see your orders here</p>
                                            <a href='/' className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors'>
                                                Start Shopping
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myorder;
