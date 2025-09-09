"use client"

import { useState } from "react"

export default ()=>{

  // let count = 0;

  // function incrimentCount(){
  //   count++;
  //   console.log(count);
  // }
  const [count,setCount] = useState(0);
  function incrimentCount(){
    // setCount(count+1);
    setCount((prev)=>{
      return prev+1;
    })
  }

  // spread operator

  let arr = [1,2,3,4,5,6];
  let newArr = [...arr,7,8];

  let obj = {
    name:"shubham",
    group:"g23"
  }

  let newObj = {
    ...obj,  // spreading obj key values in newObj
    num:1
  }

  let [info,setInfo] = useState({name:"shubham",group:"g23"});

  function updateInfo(){
    setInfo((prev)=>{
      return {
        ...prev,
        num:1
      }
    })
  }

  let [nums,setNums] = useState([1,2,3,4,5,6]);

  function updateNums(){
    setNums((prev)=>{
      return [...prev,7,8,9];
    })
  }
  // [1,2,3,4,5,6,7,8,9] -> first click
  // [1,2,3,4,5,6,7,8,9,7,8,9] ->second click
  console.log("nums ->",nums);
  console.log("obj ->",info);
  return <div>
    <h1>About page</h1>
    <h2 className="text-4xl text-center">{count}</h2>
    <button onClick={(e)=>{incrimentCount()}} >Incriment</button>
    <button onClick={(e)=>{updateInfo()}} >updateInfo</button>
    <button onClick={(e)=>{updateNums()}} >updateNums</button>
  </div>
}