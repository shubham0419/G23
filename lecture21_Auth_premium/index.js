const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
require("dotenv").config();
const cors = require("cors");

var corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(corsOptions))
// router
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const connectToDB = require("./connectDB/connect");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

// routes
app.use("/auth",authRouter);
app.use("/user",userRouter);

app.get("/", (req, res) => {	});

connectToDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
