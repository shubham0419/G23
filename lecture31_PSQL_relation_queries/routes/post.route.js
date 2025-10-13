const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async(req,res)=>{
  try {
    const {title,content,userId} = req.body;
    const post = await prisma.post.create({
      data:{
        title,
        content,
        authorId:userId
      }
    })
    res.status(201).json({post});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.get("/all",async(req,res)=>{
  try {
    // const allPosts = await prisma.post.findMany({
    //   include:{
    //     author:true,
    //     comments:true
    //   }
    // });
    const allPosts = await prisma.post.findMany({
      include:{
        author:true,
        comments:{
          include:{author:true}
        },
      }
    });
    res.status(200).json({allPosts})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.put("/update/:id",async (req,res)=>{
  try {
    const {id} = req.params;
    const post = await prisma.post.update({
      where:{id:id},
      data:{content:"this is updated post"}
    });
    res.status(200).json({post});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

// pagenation
router.get("/pagenation",async (req,res)=>{
  try {
    const {page=1,limit=10} = req.query;   // default value of page is 1 & limit is 10
    const skipCount = page*limit;
    const posts = await prisma.post.findMany({
      skip:skipCount,
      take:limit,
    })
    res.status(200).json({posts})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})


router.post("/bulk/upload",async (req,res)=>{
  try {
    const {posts} = req.body;
    // const promiseArray = posts.map((post)=>{
    //   return prisma.post.create({data:post});
    // })

    // const allPosts = await Promise.all(promiseArray);
    const allPosts = await prisma.post.createMany({
      data:posts,
      skipDuplicates:true
    })
    res.status(200).json({allPosts})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})
module.exports = router;