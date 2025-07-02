const express = require("express");
const app = express();
const PORT = 4000;

app.get("/",(req,res)=>{
  res.send("server running")
})

app.post("/user",(req,res)=>{
  res.send("hello");
})

app.listen(PORT,()=>{
  console.log(`server live on ${PORT}`);
});