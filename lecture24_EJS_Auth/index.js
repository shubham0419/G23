const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
require("dotenv").config();
const cookieParser = require('cookie-parser');
// router
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const connectToDB = require("./connectDB/connect");
const verifyUser = require("./middleware/auth.middleware");
const Product = require("./models/product.model");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);

app.get("/",verifyUser, async (req, res) => {
  const products = await Product.find();
  res.render("home",{products});
});

connectToDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
