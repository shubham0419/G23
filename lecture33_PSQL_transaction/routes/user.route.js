const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {email,name} = req.body;
    const user = await prisma.user.create({
      data:{name,email}
    })
    res.status(201).json({user});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})


router.get("/all",async (req,res)=>{
  try {
    // const users = await prisma.user.findMany({
    //   where:{name:{startsWith:"sh"}},
    //   orderBy:{createdAt:"desc"}
    // })

    // const users = await prisma.user.findMany({
    //   where:{name:{contains:"sh",mode:"insensitive"}},
    //   orderBy:{createdAt:"desc"}
    // })
    
    // const users = await prisma.user.findMany({
    //   where:{balance:{gt:1000}},
    //   orderBy:{createdAt:"desc"}
    // })

    // get user which haven't sent any money
    const users = await prisma.user.findMany({
      where:{sentTrns:{
        none:{}
      }},
      orderBy:{createdAt:"desc"}
    })

    res.status(200).json({users});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})


module.exports = router;