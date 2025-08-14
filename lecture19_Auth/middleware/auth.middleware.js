const jwt = require("jsonwebtoken");

function verifyUser(req,res,next){
  try {
    const token = req.headers.authorization;
    const userData = jwt.verify(token,process.env.JWT_SECRET);
    // userData = payload which we passed when creating token
    next()
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}

module.exports = verifyUser