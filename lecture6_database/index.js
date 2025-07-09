const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config();
const {MongoClient} = require("mongodb");

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
})

app.listen(PORT,()=>{
  dbConnect().then(()=>{
    console.log("db connected");
  }).catch((err)=>{console.log(err);})

  console.log(`app live on ${PORT}`);
})