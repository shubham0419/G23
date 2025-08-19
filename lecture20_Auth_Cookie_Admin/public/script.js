const signup = document.getElementById("signup-form");
const login = document.getElementById("login-form");

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
  alert(res.data.message);
})

login.addEventListener("submit",async (e)=>{
  e.preventDefault();
  try {
    const formChildren = login.children;
    const email = formChildren[0].value;
    const password = formChildren[1].value;
    let res = await axios.post("http://localhost:4000/auth/login",{
      email:email,
      password:password
    })
    alert("logged in successfully");
  } catch (error) {
    alert(error.message)
  }
})