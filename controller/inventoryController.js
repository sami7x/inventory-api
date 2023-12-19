//importing modules
const asyncHandler = require("express-async-handler");
const Inventory = require("../model/inventoryModel");
const user = require("../model/userModel");

//for adding inventory
const createInventory = asyncHandler(async(req,res)=>
{
    console.log("The request is:", req.body);
    const {product_name, product_description, color, stock, price} = req.body;
    
    if(!product_name || !product_description ||!color ||!stock ||!price)
    {
        res.status(400);
        throw new Error("All fields are mandatory");

    }
    //business logic
    try{
        //saving inventory query in DB
        const inventory = await Inventory.create({
            product_name, 
            product_description,
            color,
            stock,
            price,
            user_id : req.user.id,

        });
        res.status(201).json(inventory);
    }
    catch(error)
        {
            console.log(error);
            res.status(500).json({error: "Could not add inentory."});
        }

    
});

//for updating inventory
const inventory_update = asyncHandler(async(req,res) =>
{
    try{
        //params fetch unique Id
        const inventoryId = req.params.inventoryId;
        const updateInventory = await Inventory.findByIdAndUpdate(
            inventoryId,
            req.body,
            { new:true}
        );

        if(!updateInventory)
        {
            return res.status(404).json({message: "Inventory not found"});
        }
        res.json({ message: "Inventory updated successfully"});
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
});

//for deleting Inventory
const inventory_delete = asyncHandler(async(req,res)=>
{
    try{
        const inventoryId = req.params.inventoryId;
        const deleteInventory = await Inventory.findByIdAndDelete(
            inventoryId,
            req.body,
        );
        if(!deleteInventory)
        {
            return res.status(404).json({message:"Inventory not found"});
        }
        res.json({message: "Inventory deleted successfully"});
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
});

//fetch Inventory record
const inventory_all = asyncHandler(async(req,res )=>
{
    try{
        const inventorys = await Inventory.find ();
        if(inventorys.length == 0)
        {
            return res.json({message: "There are no inventory left"})
        }
        res.json(inventorys);

    }   
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
});

//fetch single inventory record
const inventory_single = asyncHandler(async(req,res )=>
{
    try{
        const inventoryId = req. params.inventoryId;
        const singleInventory= await Inventory.findById (
            inventoryId,
            req.body,
        );
        if(!singleInventory)
        {
            return res.status(404).json({message: "Inventory not found"});
        }
        res.json(singleInventory);
    }
    catch(error)
    {
        res.status(500).json({mesage: error.message});

    }
});

module.exports = {createInventory, inventory_delete, inventory_update,inventory_all, inventory_single};