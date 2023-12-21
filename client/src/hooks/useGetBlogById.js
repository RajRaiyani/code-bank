import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function useGetBlogById(id)
{
    const [data , setData]=useState({});
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/v2/blog/`+id, {
           method: "GET",
           headers: {
               'Content-Type': 'application/json',
               "token": Cookies.get("userToken")? Cookies.get("userToken"):Cookies.get("superuserToken")
           }
       }).then(res => res.json())
           .then(res => {
               if (res.status === "OK") {
                setData(res.data);
               }
               else{
                   console.log(res);
               }
           })
           .catch(e => console.log("error : " + e));
   }, [id]);
   return [data , setData];
}

export default useGetBlogById;