import React, { useEffect, useState } from 'react';

const Myorder = () => {
    const [Order, setOrder] = useState([]);

    useEffect(() => {
        // Simulate fetching orders
        setTimeout(() => {
            const orders = [
                {
                    _id: "1",
                    createdAt: new Date(),
                    shippingAddress: { city: "Pune", country: "India" },
                    orderItems: [
                        {
                            name: "Product1",
                            img: "https://picsum.photos/500/500?random=1"
                        },
                    ],
                    totalPrice: 120,
                    isPaid: true
                },
                {
                    _id: "2",
                    createdAt: new Date(),
                    shippingAddress: { city: "Mumbai", country: "India" },
                    orderItems: [
                        {
                            name: "Product2",
                            img: "https://picsum.photos/500/500?random=2"
                        },
                    ],
                    totalPrice: 120,
                    isPaid: true
                }
            ];
            setOrder(orders);
        }, 1000);
    }, []);

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Order</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order ID</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Order.length > 0 ? (
                            Order.map((order) => (
                                <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                    <td className='py-2 px-4 sm:py-4 sm:px-4'>
                                        <img
                                            src={order.orderItems[0].img}
                                            alt={order.orderItems[0].name}
                                            className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg'
                                        />
                                    </td>
                                    <td className='py-2 px-4'>{order._id}</td>
                                    <td className='py-2 px-4'>{order.createdAt.toLocaleDateString()}</td>
                                    <td className='py-2 px-4'>{order.shippingAddress.city}, {order.shippingAddress.country}</td>
                                    <td className='py-2 px-4'>{order.orderItems[0].name}</td>
                                    <td className='py-2 px-4'>₹{order.totalPrice}</td>
                                    <td className='py-2 px-4'>
                                    <span className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                        {order.isPaid ? "Paid" : "Pending"}
                                    </span>

                                        </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                                    You have no orders
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
