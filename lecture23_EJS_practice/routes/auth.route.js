const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middleware/auth.middleware");
const verifyAdmin = require("../middleware/admin.middleware");

router.post("/signup",async (req,res)=>{
  try {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
      throw new Error("All fields are required");
    }
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
      name,
      email,
      password:hashPassword
    })
    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

router.post("/admin/signup",async (req,res)=>{
   try {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
      throw new Error("All fields are required");
    }
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
      name,
      email,
      password:hashPassword,
      role:"admin"
    })
    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

router.get("/user",verifyUser,async(req,res)=>{
  try {
    res.status(200).json({message:"you have access"})
  } catch (error) {
    res.status(400).json({messsgae:error.message});
  }
})

router.get("/info",verifyUser,verifyAdmin,async (req,res)=>{
  try {
    // return all the users which are not admin
    const users = await User.find({role:{$ne:"admin"}})
    res.status(200).json({users})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.post("/login",async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
      throw new Error("Invalid email or password");
    }
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({name:user.name,id:user._id},process.env.JWT_SECRET,
      {expiresIn:'1h'})
    res.cookie("token",token,{httpOnly:true,maxAge:24*60*60*1000,secure:true})
    res.status(200).json({message:"user logged in successfully",token});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

module.exports = router;