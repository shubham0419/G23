const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user.route")
const courseRouter = require("./routes/course.route")
const transactionRouter = require("./routes/transaction.route")


app.use("/user",userRouter)
app.use("/course",courseRouter);
app.use("/transaction",transactionRouter);

app.get("/", (req, res) => {	});

app.listen(PORT, () => console.log("Server running on port " + PORT));