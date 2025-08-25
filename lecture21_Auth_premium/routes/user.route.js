const express =require("express");
const Product = require("../models/product.model");
const verifyUser = require("../middleware/auth.middleware");
const { goldUser, platinumUser } = require("../middleware/premium.middleware");
const User = require("../models/user.model");
const router = express.Router();

router.get("/create/products",async(req,res)=>{
  try {
    const dummyProducts = [
      {
        name:"product 1",
        price:1999,
        description:"this is prodduct 1 description"
      },
      {
        name:"product 2",
        price:1899,
        description:"this is prodduct 2 description"
      },
    ]
    const products = await Product.insertMany(dummyProducts);
    res.status(201).json({products});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.get("/package/buy/",verifyUser,async(req,res)=>{
  try {
    const userId = req.user.id;
    const {package} = req.query;
    const user = await User.findById(userId);
    user.package = package;
    if(package=="gold"){
      user.credits += 500
    }else{
      user.credits += 1000;
    }
    await user.save();
    res.status(200).json({message:"package bought succsesfully"})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.get("/all/products",verifyUser,async (req,res)=>{
  try {
    const products = await Product.find({});
    res.status(200).json({products})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.get("/discount/gold/:id",verifyUser,goldUser,async (req,res)=>{
  try {
    const {id} = req.params;
    const userId = req.user.id;
    const product = await Product.findById(id);
    const user = await User.findById(userId);
    const discount = product.price - (product.price*0.10);
    // console.log(user);
    if((user.credits - product.price*0.10)<0){
      throw new Error("not enough credits");
    }
    user.credits = user.credits - discount;
    res.status(200).json({discountedPrice:discount})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

router.get("/discount/platinum/:id",verifyUser,platinumUser,async (req,res)=>{
  try {
    const {id} = req.params;
    const userId = req.user.id;
    const product = await Product.findById(id);
    const user = await User.findById(userId);
    const discount = product.price - (product.price*0.20);
    if((user.credits - discount)<0){
      throw new Error("not enough credits");
    }
    user.credits = user.credits - discount;
    res.status(200).json({discountedPrice:discount})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
module.exports = router;