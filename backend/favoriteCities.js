const mongoose = require("mongoose");
const favourite = new mongoose.Schema({
    userId: String,
    cityName: String,
    temperature: Number,
    clouds: Number,
    icon: String,
    lastUpdatedTime: Number
})
module.exports = mongoose.model("favourites", favourite);