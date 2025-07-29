

async function getUser(){
  let res = await axios.get("http://localhost:5000/user");
  let user = res.data.user;
  // console.log(user);
  
}


getUser();