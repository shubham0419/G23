const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const PORT = 5000;
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", (client)=>{
  console.log("user 1 connected",client.id);

  client.emit("first","hello this is my first message");

  client.on("notice",(data)=>{
    console.log(data);  
  })
})


app.get("/", (req, res) => {	});

server.listen(PORT, () => console.log("Server running on port " + PORT));