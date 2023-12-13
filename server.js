//importing module
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");



//init
connectDB();
const app = express();


//port define
const PORT = process.env.PORT || 5000;

//server start
const startServer = async()=>
{
    try{
        app.listen(PORT,()=>
        {
            console.log(`Port is running on server ${PORT}`);
        })

    }
    catch(error)
    {
        console.error(error);
    }

};

startServer();