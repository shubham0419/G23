const express = require("express");
const app = express();
const PORT = 4000;

app.use((req,res,next)=>{
  console.log("middleware 1");
  next();
})

app.use("/user",(req,res,next)=>{
  console.log("/user middleware");
  next()
});

function userVerify(req,res,next){
  console.log("api specific middlewares");
  next();
}

app.get("/user/verify",userVerify,(req,res)=>{
  console.log("/user/verify runs");
  res.send("user verify hit");
})

// "/user middleware will run"
app.get("/user/all",(req,res)=>{
  console.log("/user/all api");
  res.send("all user api");
})
// "/user middleware will not run"
app.get("/userAll",(req,res)=>{
  console.log("/user/all api");
  res.send("all user api");
})

app.get("/",(req,res)=>{
  console.log("get request");
  // res.send("ok");
  res.json("ok");
})

app.listen(PORT,()=>{
  console.log(`server live on ${PORT}`);
})