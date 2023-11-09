const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
product_type: String,
feature: String,
cost: Number
})
module.exports = mongoose.model("Product",productSchema)