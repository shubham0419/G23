"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [products,setProducts] = useState([])

  const getProducts = async()=>{
    try {
      // API Call
      let res = await axios.get("http://localhost:4000/user/all/products",
        {withCredentials:true})
      setProducts(res.data.products)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
    console.log("hiii");
    // setCount((prev)=>prev+1);
  }, [count]);

  function incrimentCount() {
    // setCount(count+1);
    setCount((prev) => {
      return prev + 1;
    });
  }
  return (
    <>
      <h1 className="text-center text-3xl">{count}</h1>
      <button onClick={(e) => {incrimentCount();}}>
        Incriment
      </button>

      <div>
        {products?.map((product)=>{
          return <div>
            <img src=""/>
            <h2>{product?.name}</h2>
            <h3>{product?.price}</h3>
            <p>{product?.description}</p>
          </div>
        })}
      </div>
    </>
  );
}
