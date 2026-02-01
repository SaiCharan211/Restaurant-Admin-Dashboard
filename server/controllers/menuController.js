import MenuItem from "../models/MenuItem.js";

export const getMenu=async (req,res)=>{
    try {
        const {category,isAvailable, minPrice, maxPrice}=req.query

        let filter={}
        if (category) filter.category=category
        if (isAvailable !== undefined) filter.isAvailable=isAvailable==="true";
        if (minPrice || maxPrice){
            filter.price={}
            if (minPrice && !isNaN(minPrice)) filter.price.$gte=Number(minPrice);
            if (maxPrice && !isNaN(maxPrice)) filter.price.$lte=Number(maxPrice)
        }

        const items=await MenuItem.find(filter);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchMenu=async (req,res)=>{
    const q=req.query.q
    if(!q) return res.json([]);
    
    const items=await MenuItem.find({$text:{$search:q}});
    res.json(items);
};


export const getMenuById=async (req,res)=>{
    const item= await MenuItem.findById(req.params.id)
    res.json(item);
};


export const createMenu=async (req,res)=>{
    const item=await MenuItem.create(req.body)
    res.status(201).json(item);
};


export const updateMenu=async (req,res)=>{
    const item=await MenuItem.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(item);
};

export const deleteMenu=async (req,res)=>{
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({message:"Item Deleted"});
};


export const toggleAvailability=async (req,res)=>{
    try {
        const item=await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        item.isAvailable=!item.isAvailable;
        await item.save();
        res.json(item)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}