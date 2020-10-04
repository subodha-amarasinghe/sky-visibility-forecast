const mongoose = require("mongoose");
const user = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String
})
module.exports = mongoose.model("users", user);