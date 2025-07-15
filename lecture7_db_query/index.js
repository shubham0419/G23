const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config();
const {MongoClient} = require("mongodb");

app.use(express.json());

const client = new MongoClient(process.env.DATABASE_URL);
let userCollection;

async function dbConnect(){
  await client.connect();
  const db = client.db("practice");
  userCollection = db.collection("users")
  return "done";
}

app.get("/",async (req,res)=>{
  // console.log(1);
  let data = await userCollection.insertOne({
    name:"shubham",
    languages:["c++","c","python","js","ts"]
  })
  res.json(data);
});

app.post("/user",async(req,res)=>{
  const {name,email,password} = req.body;
  let result = await userCollection.insertOne({
    name:name,
    email:email,
    password:password
  })
  res.status(201).json(result);
})

app.post("/user/bulk",async(req,res)=>{
  const {users} = req.body;
  const result = await userCollection.insertMany(users);
  res.status(201).json(result);
})

app.delete("/user/:id",async(req,res)=>{
  const {id} = req.params;
  // const result = await userCollection.deleteOne({name:"shubham"});
  res.status(200).json({result,message:"user deleted successfully"})
})

app.get("/user/all",async(req,res)=>{
  const data = await userCollection.find({}).toArray();
  res.status(200).json({data});
})

app.put("/user/update",async(req,res)=>{
  try {
    const result = await userCollection.updateOne(
      {email:"shubham@gmail.com"},
      {$set:{name:"updated name"}}
    )
    res.status(202).json({result})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
  
})

app.listen(PORT,()=>{
  dbConnect().then(()=>{
    console.log("db connected");
  }).catch((err)=>{console.log(err);})

  console.log(`app live on ${PORT}`);
})