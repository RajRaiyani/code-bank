import { set } from "react-hook-form";
import useGetAllQuestions from "./hooks/useGetAllQuestions"
import { useEffect, useState } from "react";

const Try=()=>{
    const [count ,setcount]=useState(0);
    useEffect(()=>{
        console.log("useEffect")
    },[])
    
    return(
        <>
        {count}
        <input type="text" onChange={(e)=>{setcount(count+1)}}/>
        </>
    )
}
export default Try;