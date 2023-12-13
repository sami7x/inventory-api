//importing module
const asyncHandler = require("express-asyn-handler");
const jwt = reqire("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");