//importing modules
// const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../model/blacklistToken");

/*
const validateToken = asyncHandler(async(req,res,next)=>
{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=> {
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
        
        if(!token)
        {
            res.status(401);
            throw new Error("User is not authorized");

        }

    }

}); */


//after logout
const validateToken = async(req,res,next)=>
{
    // let token;
    // let authHeader = req.headers.Authorization || req.headers.authorization;

    //Bearer ma token
    const authHeader = req.headers.authorization;

    if(! authHeader && !authHeader.startsWith("Bearer")){
     return res.status(401).json({message: "User is not authorized"});
    }

    //headers ma token
    const token = authHeader.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({message: "User is not authorized"});

    }

    //erro handling
    try{
        //synchronous code for expiring code
        const isTokenBlackListed = await BlacklistToken.findOne({token});
        if(isTokenBlackListed)
        {
            return res.status(401).json({message: "Access denied. Token revoked"});
        }
        //upto here for token expire
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
            if(err)
            {
                return res.status(401).json({message: "Invalid token"});
            }
            req.user = decoded.user;
            next();
        });
    }
    catch(err)
    {
        //handle throw error
        return res.status(500).json({message: "Error verifying token"});
    }

};


module.exports = validateToken;