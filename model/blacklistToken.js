//importing module
const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required:true,
        unique:true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);
module.exports = BlacklistToken;