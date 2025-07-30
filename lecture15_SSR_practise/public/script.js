const container = document.getElementById("container");

async function getUser(){
  let res = await axios.get("http://localhost:5000/user");
  let user = res.data.user;
  // console.log(user);
  container.innerHTML = `<h1>${user.name}</h1> <h4>${user.email}</h4>
  <p>${user.age}</p>`;
}


getUser();