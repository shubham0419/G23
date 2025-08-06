const express = require("express");
const app = express();
const PORT = 4000;
const connectDB = require("./db/connectDb");
require("dotenv").config();
const path = require("path");
//routers
// const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todo.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

// app.use("/user",userRouter);
app.use("/todo",todoRouter);

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
})
.catch((err)=>console.log(err))

