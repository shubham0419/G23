

let otp = '';
function otpGenerator(len){
  try {
    for(let i=0;i<len;i++){
      otp += Math.floor(Math.random()*10);
    }
    return otp;
  } catch (error) {
    throw error;
  }
}

function otpVerify(userOtp){
  try {
    if(userOtp==otp){
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}

module.exports = {otpGenerator,otpVerify};