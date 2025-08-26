const jwt = require("jsonwebtoken");

function verifyUser(req,res,next){
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1] || req.cookies.token;
    
    const payload = jwt.verify(token,process.env.JWT_SECRET);
    // payload = payload which we passed when creating token
    req.user = payload;
    next()
  } catch (error) {
    console.log(error);
    res.redirect("/auth/login");
    // return res.status(400).json({message:error.message});
  }
}

module.exports = verifyUser