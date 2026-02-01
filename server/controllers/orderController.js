import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js"; // Ensure model is registered

export const getOrders=async (req,res)=>{
    try {
        const {page=1,limit=10,status}=req.query;
        
        // Sanitize inputs to ensure they are valid numbers
        const pageNum = Math.max(1, Number(page) || 1);
        const limitNum = Math.max(1, Number(limit) || 10);

        let filter={}
        if (status) filter.status=status;

        const orders=await Order.find(filter)
        .populate("items.menuItem", "name")
        .skip((pageNum-1)*limitNum)
        .limit(limitNum)
        .sort({createdAt:-1});

        res.json(orders);
    } catch (error) {
        console.error("Error in getOrders:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById=async (req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("items.menuItem")
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createOrder=async (req,res)=>{
    try {
        const order=await Order.create(req.body)
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateStatus=async (req,res)=>{
    try {
        const order=await Order.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};