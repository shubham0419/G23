const express = require("express");
const connectToDB = require("./connectDB/connect");
const app = express();
const PORT = 5000;
require("dotenv").config();
const session  = require("express-session");
// router
const authRouter = require("./routes/auth.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sessionConfig = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true ,maxAge:7*24*60*60*1000}
}
app.use(session(sessionConfig));
// routes
app.use("/auth",authRouter)
app.get("/", (req, res) => {	});

connectToDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error))
