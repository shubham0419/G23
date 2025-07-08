const express = require("express");
const app = express();
const PORT = 4000;

app.get("/",(req,res)=>{
  res.status(200).json({message:"home route running"})
})

// query params
app.get("/user",async (req,res)=>{
  // console.log(req.query);
  try {
    const {name,num} = req.query;
    console.log(name,num);
    res.status(200).json({message:"user api running"})
  } catch (error) {
    console.log(error);
    res.status(400).json({message:error.message})
  }
})

// params
app.get("/user/:id",(req,res)=>{
  console.log(req.params);
  res.status(200).json({message:"single user api running"})
})

app.get("/user/:id/:paymentId/:status",(req,res)=>{
  console.log(req.params);
  const {id,paymentId,status} = req.params;
  console.log(id,paymentId,status);
  // res.send("ok"); // will get cannot set headers error
  res.status(200).json({message:"single user api running"})
})

app.listen(PORT,()=>{
  console.log(`app is live on ${PORT}`);
})