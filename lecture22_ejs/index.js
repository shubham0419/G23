const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"))

const products = [
  {
    name:"product 1",
    price:5000,
    description:"very costly"
  },
  {
    name:"product 2",
    price:100,
    description:"very cheap"
  }
]

app.get("/", (req, res) => {
  res.render("home",{products:products,name:"shubham"});
});

app.listen(PORT, () => console.log("Server running on port " + PORT));