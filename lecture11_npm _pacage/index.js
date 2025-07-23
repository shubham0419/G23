
function otpGenerator(){
  try {
    let otp = '';
    for(let i=0;i<6;i++){
      otp += Math.floor(Math.random()*10);
    }
    return otp;
  } catch (error) {
    throw error;
  }
}

module.exports = otpGenerator;