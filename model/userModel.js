//importing module
const mongoose = require("mongoose");
const { stringify } = require("querystring");

const userSchema = mongoose.Schema(
    {
        email:
        {
            type:stringify,
            required: [true, "Please enter your email address."],
        },
        username:
        {
            type:String,
            required:[true, "Please enter usernmae."],
        },
        password:
        {
            type:String,
            required:[true, "Please enter password."]
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("User", userSchema);