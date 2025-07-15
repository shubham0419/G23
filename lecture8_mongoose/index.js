const express = require("express");
const app = express();
const PORT = 4000;
const connectDB = require("./db/connectDb");
const User = require("./models/user.model");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    const {name,email,age} = req.body;
    // const user = await User.create({
    //   name:name,
    //   email:email,
    //   age:age
    // })
    const user = await User.create({
      name,
      email,
      age
    })
    res.status(201).json({user});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

app.get("/",async(req,res)=>{
  try {
    let users = await User.find();
    res.status(200).json({users})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

app.delete("/user/:id",async (req,res)=>{
  try {
    const {id} = req.params;
    // let user = await User.findByIdAndDelete(id);
    let user = await User.deleteOne({_id:id});
    res.status(200).json({user,message:"user delted successfully"})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
})
.catch((err)=>console.log(err))

