const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create/bulk",async (req,res)=>{
  try {
    const {courses} = req.body;
    const allCourses = await prisma.course.createMany({
      data:courses,
      skipDuplicates:true
    });
    res.status(200).json({allCourses})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

router.post("/enrollement",async (req,res)=>{
  try {
    const {userId,courseId} = req.body;
    const enrollement = await prisma.enrollment.create({
      data:{userId,courseId}
    })
    res.status(200).json({enrollement});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

router.get("/enrollements",async (req,res)=>{
  try {
    const allEnrollments = await prisma.enrollment.findMany({
      include:{
        course:true,
        user:true
      }
    })
    res.status(200).json({allEnrollments})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;