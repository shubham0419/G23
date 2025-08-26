const User = require("../models/user.model");


async function goldUser(req,res,next){
  try {
    const currUserId = req.user.id;
    const user = await User.findById(currUserId);
    // platinum has all the access of gold thats we have to 
    // check for platinum too.
    if(user.package != "gold" && user.package != "platinum"){
      throw new Error("You don't have access")
    }
    next();
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

async function platinumUser(req,res,next){
  try {
    const currUserId = req.user.id;
    const user = await User.findById(currUserId);
    if(user.package != "platinum"){
      throw new Error("You don't have access")
    }
    next();
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}
module.exports = {goldUser,platinumUser};