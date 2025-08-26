const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true,
    required:true,
  },
  password:{
    type:String,
    minLength:6,
    required:true
  },
  role:{
    type:String,
    enum:["user","admin"], //possible values of field/variable
    default:"user",
    select:false   
  },
  package:{
    type:String,
    enum:["free","gold","platinum"],
    default:"free",
  },
  credits:{
    type:Number,
    enum:[0,500,1000],
    default:0
  }
})

const User = mongoose.model("User",userSchema);
module.exports = User;

