const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middelware/authMiddelWare")

const router = express.Router();

// @route POST/api/orders
// @desc create a new order
// @access Private
router.post("/", protect, async (req, res) => {
    try {
        const {
            orderItem,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid,
            paidAt,
            isDeliverd,
            paymentStatus,
            paymentDetails
        } = req.body;

        // Validate required fields
        if (!orderItem || !Array.isArray(orderItem) || orderItem.length === 0) {
            return res.status(400).json({ message: "Order items are required" });
        }

        if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.lastName || 
            !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || 
            !shippingAddress.country || !shippingAddress.phno) {
            return res.status(400).json({ message: "All shipping address fields are required" });
        }

        if (!totalPrice || totalPrice <= 0) {
            return res.status(400).json({ message: "Valid total price is required" });
        }

        const newOrder = await Order.create({
            user: req.user._id,
            orderItem,
            shippingAddress,
            paymentMethod: paymentMethod || 'PayPal',
            totalPrice,
            isPaid: isPaid || false,
            paidAt: isPaid ? (paidAt || new Date()) : null,
            isDeliverd: isDeliverd || false,
            paymentStatus: paymentStatus || 'pending',
            paymentDetails: paymentDetails || null
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
});

// @route GET/api/orders/my-orders
// @desc get logged-in user's orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
    try {       
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Finding Orders Error:", error })
    }
});

// @route GET/api/orders/:id
// @desc get order details by ID
// @access  Private
router.get("/:id",protect,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({Error:"Order not found"})
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({Error:"Finding ID Order Error:",error})
    }
});
module.exports = router;    
