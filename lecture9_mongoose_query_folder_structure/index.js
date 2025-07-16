const express = require("express");
const app = express();
const PORT = 4000;
const connectDB = require("./db/connectDb");
const User = require("./models/user.model");
const bulkUserCreate = require("./db/seed");
require("dotenv").config();
//routers
const userRouter = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user",userRouter);

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
})
.catch((err)=>console.log(err))

