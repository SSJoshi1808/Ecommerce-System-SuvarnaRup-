const express= require("express")
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const{protect} = require("../middelware/authMiddelWare")
const route = express.Router();

//@route POST/api/checkout
// @desc to create a new checkout session
// @access private
route.post("/",protect,async(req,res)=>{
    const {
        checkOutItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    }= req.body;

    try {
        // Validate checkout items
        if(!checkOutItems || !Array.isArray(checkOutItems) || checkOutItems.length === 0) {
            return res.status(400).json({message: "Invalid or empty checkout items"})
        }

        // Validate required fields in shipping address
        if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.lastName || 
            !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || 
            !shippingAddress.country || !shippingAddress.phno) {
            return res.status(400).json({message: "All shipping address fields are required"})
        }

        // Validate payment method
        if (!['PayPal', 'Credit Card', 'Debit Card'].includes(paymentMethod)) {
            return res.status(400).json({message: "Invalid payment method"})
        }

        // Validate total price
        if (typeof totalPrice !== 'number' || totalPrice <= 0) {
            return res.status(400).json({message: "Invalid total price"})
        }

        // Transform cart items to checkout items format
        const transformedItems = checkOutItems.map(item => ({
            productId: item.productId,
            name: item.name,
            image: item.img,
            price: parseFloat(item.price),
            quantity: item.quantity
        }));

        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkOutItems: transformedItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        return res.status(201).json(newCheckout);
    } catch(err) {
        console.error("Checkout creation error:", err);
        return res.status(500).json({message: "Error creating checkout session", error: err.message});
    }

})
// @route PUT/api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access private
route.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        if (!paymentStatus || !paymentDetails) {
            return res.status(400).json({ message: "Payment status and details are required" });
        }

        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid) {
            return res.status(400).json({ message: "Checkout is already paid" });
        }

        if (paymentStatus.toLowerCase() === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus.toLowerCase();
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            
            await checkout.save();
            return res.status(200).json({ message: "Payment processed successfully", checkout });
        }

        return res.status(400).json({ message: "Invalid payment status" });
    } catch (err) {
        console.error("Payment processing error:", err);
        return res.status(500).json({ message: err.message || "Error processing payment" });
    }
})
// @route POST/api/checkout/:id/finalize
// @desc Finalize the checkout and convert to an order after payment confirmation
// @access private
route.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isFinalise) {
            return res.status(400).json({ message: "Checkout already finalized" });
        }

        if (!checkout.isPaid) {
            return res.status(400).json({ message: "Checkout must be paid before finalizing" });
        }

        const finalOrder = await Order.create({
            user: checkout.user,
            orderItems: checkout.checkOutItems,
            shippingAddress: checkout.shippingAddress,
            paymentMethod: checkout.paymentMethod,
            totalPrice: checkout.totalPrice,
            isPaid: true,
            paidAt: checkout.paidAt,
            isDeliverd: false,
            paymentStatus: "paid",
            paymentDetails: checkout.paymentDetails
        });

        checkout.isFinalise = true;
        checkout.finalizedAt = Date.now();
        await checkout.save();

        // Clear the user's cart after successful order creation
        await Cart.findOneAndDelete({ user: checkout.user });

        return res.status(201).json({
            message: "Order finalized successfully",
            order: finalOrder
        });
    } catch (err) {
        console.error("Order finalization error:", err);
        return res.status(500).json({ message: err.message || "Error finalizing order" });
    }
})
module.exports=route;