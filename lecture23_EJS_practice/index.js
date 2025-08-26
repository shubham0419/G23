const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
require("dotenv").config();
// router
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const connectToDB = require("./connectDB/connect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);

app.get("/", (req, res) => {	});

connectToDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
