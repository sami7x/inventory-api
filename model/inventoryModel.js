//importing module
const { MongoDBCollectionNamespace } = require("mongodb");
const mongoose = require("mongoose");

const inventorySchema = mongoose.schema(
    {
        user_id:
        {
            type:mongoose.Schema.Types.ObjectId, //for auto increment
            required:true,
            ref: "User",
        },
        product_name:
        {
            type: String,
            required: [true, "Please enter the product name."],
        },
        product_description:
        {
            type: String,
            required: [true, "Please add product description"],
        },
        color:
        {
            type: String,
        },
        stock:
        {
            type: Number,
            required: [true, "Please enter the number of stock."],
        },
        price:
        {
            type: Number,
            required: [true, "Please enter the price of the product."],
        },

    },
);

module.exports = mongoose.model("inventory", inventorySchema);