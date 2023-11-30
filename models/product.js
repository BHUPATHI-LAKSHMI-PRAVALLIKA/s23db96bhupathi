const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
product_type: {type:String,required:true},
feature: {type:String,required:true},
cost: {type:Number,required:true,min:0,max:10000}
})
module.exports = mongoose.model("Product",productSchema);