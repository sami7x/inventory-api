//importing module
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const BlacklistToken = require("../model/blacklistToken");


const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //   hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password success", hashedPassword);

  //   saving user query
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.json({ message: "Register User" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  // compare password with hashed password
  if (user && user.password && (typeof password === "string")) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not correct");
  }
});

//for viewing ur profile detail
const currentUser = asyncHandler(async(req,res) =>{
    res.json(req.user);
});


//for logout
const logoutUser = asyncHandler(async(req, res) =>
{
  const token = req.headers.authorization?.split(" ")[1];

  if(!token)
  {
    return res.status(400).json({message: "Token not provied"});
  }

  //error handling
  try{
    //synchronous code here
    await BlacklistToken.create({token});
    return res.status(500).json({message: "Logout Successfully"});
  }
  catch(err)
  {
    return res.status(500).json({message: "Error Logging out"});
  }
});

module.exports = { registerUser, loginUser, currentUser, logoutUser};