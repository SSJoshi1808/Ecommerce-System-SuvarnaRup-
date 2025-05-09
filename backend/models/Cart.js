const mongoose=require("mongoose");
const cartItemSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required:true,
    },
    name:String,
    img:String,
    price:String,
    collections:String,
    category:String,
    quantity:{
        type: Number,
        default:1
    },
},
{_id:false}

);
const cartScheme=  new mongoose.Schema({
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       },
       guestId:{
             type:String,   
       },
       products:[cartItemSchema],
       totalPrice:{
        type:Number,
        required:true,
        default:0,
       },
},
{timestamps:true}
);

module.exports=mongoose.model("Cart",cartScheme);