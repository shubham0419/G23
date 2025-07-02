const express = require("express");
const app = express();
const PORT=4000;

app.use(express.json());

app.get("/",(req,res)=>{
  // res.send("server is live")
  const result = {
    name:"nothing",
    work:null
  }
  // res.json(result);
  // res.json({result});
  res.json({data:result,message:"successfull"});
})

app.post("/",(req,res)=>{
  console.log(req.body);
  const result = {
    name:"nothing",
    work:null
  }
  // res.status(200).send("ok");
  res.status(201).json(result);
})

app.listen(PORT,()=>{
  console.log(`server live on ${PORT}`);
})