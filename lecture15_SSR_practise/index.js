const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
  res.send("hiiii")
});

app.get("/user",(req,res)=>{
  try {
    let user = {
      name:"user",
      email:"user@gmail.com",
      age:21
    }
    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

app.get("/login",(req,res)=>{
  res.redirect("login.html")
});

app.listen(PORT, () => console.log("Server running on port " + PORT));