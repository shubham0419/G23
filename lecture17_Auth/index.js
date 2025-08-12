const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
require("dotenv").config();
// router
const authRouter = require("./routes/auth.route")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

// routes
app.use("/auth",authRouter);

app.get("/", (req, res) => {	});

app.listen(PORT, () => console.log("Server running on port " + PORT));