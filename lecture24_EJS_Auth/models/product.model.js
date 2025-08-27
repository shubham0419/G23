const mongoose = require("mongoose");

const productScehma = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    min:9,
    default:9
  },
  description:{
    type:String
  }
},{
  timestamps:true
})
const Product = mongoose.model("Product",productScehma);
module.exports = Product;

