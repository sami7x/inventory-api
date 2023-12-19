//importimg module
const express = require("express");
const {registerUser, loginUser, currentUser, logoutUser} = require("../controller/userController");
const validateToken = require ("../middleware/validateTokenHandler");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser);

router.get("/current",validateToken, currentUser);

module.exports = router;