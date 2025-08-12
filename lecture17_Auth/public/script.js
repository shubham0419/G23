const signup = document.getElementById("signup-form");

signup.addEventListener("submit",async (e)=>{
  e.preventDefault();
  const formchildren = signup.children;
  const name = formchildren[0].value;
  const email = formchildren[1].value;
  const password = formchildren[2].value;
  const res = await axios.post("http://localhost:4000/auth/signup",{
    name:name,
    email:email,
    password:password
  })
  console.log(res.data.message);
})