"use client"
import { useParams } from "next/navigation"

const Page = ()=>{

  const params = useParams();
  const {id} = params;

  return <div>
    hello {id}
  </div>
}

// const Page = ({params})=>{

//   const {id} = params;

//   return <div>
//     hello {id}
//   </div>
// }
export default Page;