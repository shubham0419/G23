const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

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
    res.status(200).json({message:"user logged in successfully"});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

module.exports = router;