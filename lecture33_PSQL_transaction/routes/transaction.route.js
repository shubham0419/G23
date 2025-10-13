const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/transfer",async (req,res)=>{
  try {
    const {senderId,recieverId,amount} = req.body;
    const transaction =  await prisma.$transaction(async (tx)=>{
      const sender = await tx.user.findUnique({
        where:{id:senderId}
      })

      if(!sender || sender.balance < amount){
        throw new Error("insufficient balance")
      }
      // step 2 -deduct
      await tx.user.update({
        where:{id:senderId},
        data:{balance:{decrement:amount}}
      })

      // step 3
      await tx.user.update({
        where:{id:recieverId},
        data:{balance:{increment:amount}}
      })

      // step 4
      const transaction = await tx.tranaction.create({
        data:{
          amount,
          recieverId,
          senderId,
        }
      })
      return transaction;
    })
    res.status(200).json({transaction});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})


module.exports = router;