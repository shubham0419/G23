const fs = require("fs");
// async
console.log(1);
fs.writeFile("./text.txt",'this is written by Async',(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("done");
  }
})
console.log(2);
// sync
fs.writeFileSync("./text.txt",'this is written by sync');

fs.readFile("./text.txt","utf-8",(err,data)=>{
  if(err){
    console.log(err);
  }else{
    console.log("async",data);
  }
})

let data = fs.readFileSync("./text.txt","utf-8")
console.log(data);

fs.appendFile("./text.txt","/n this appended data",(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("done");
  }
});

fs.unlink("./text.txt",(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log("done");
  }
})