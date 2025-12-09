const express = require("express");
const app = express();
const PORT = 5000;

const multer = require("multer");
const uploadStudents = require("./controller/uploadController");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post("/upload", upload.single("datafiles"),  uploadStudents);


app.listen(PORT, () => console.log("Server running on port " + PORT));