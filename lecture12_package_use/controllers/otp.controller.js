const {otpGenerator,otpVerify} = require("@shubhamo7/otp-generator");

const generateOtp = async(req,res)=>{
  try {
    const otp = otpGenerator(4);
    res.status(200).json({otp});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

const verifyOtp = async(req,res)=>{
  try {
    const {otp} = req.body;
    const isMatched = otpVerify(otp);
    res.status(200).json({isMatched});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

module.exports = {generateOtp,verifyOtp}