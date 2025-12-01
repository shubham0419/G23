const express = require("express");
const client = require("./client");
const { default: axios } = require("axios");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let data = await client.set("users:1","shubham");  // will get ok
  // let data2 = await client.set("users:1","ash",{'NX':true}) // will get nill

  client.expire("users:1",5);

  let result1 = await client.get("users:1");
  res.json({result1,data});
});

// multi set of string
app.get("/mset", async (req, res) => {
  let res1 = await client.mset([
    "users:2","user 2 name",
    "users:3","user 3 name",
    "users:4","user 4 name"
  ]);

  let data = await client.mget("users:2","users:3","users:4");
  res.json(data);
});

// lists
app.get("/list",async (req,res)=>{
  const res1 = await client.lpush("list","data 1");
  const res2 = await client.lpush("list","data 2");
  const res3 = await client.lpush("list","data 3");

  const allData = await client.lrange("list",0,-1);

  const data1 = await client.lpop("list");
  res.json({allData,data1})
})

// Json 
app.get("/test",async (req,res)=>{
  // step 1. data check in redis
  let data = await client.get("photos");
  if(data){
    return res.json({data:JSON.parse(data)});
  }
  // step 2: data fetch if "data is undefined/nill"
  let result = await axios.get("https://jsonplaceholder.typicode.com/photos");

  // store data in redis
  let res2 = await client.set("photos",JSON.stringify(result.data));
  
  // step 4 expirey set
  client.expire("photos",10);

  res.json({data:result.data});
})


app.listen(PORT, () => console.log("Server running on port " + PORT));