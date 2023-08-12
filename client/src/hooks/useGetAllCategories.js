import Cookies from "js-cookie";
import { useState , useEffect } from "react";
import { Navigate } from "react-router-dom";
function useGetAllCategories() {
  const [arrayValues, setArrayValues] = useState([]);
     useEffect(() => {
    fetch("http://localhost:3007/api/v1/home/list/get/category", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("userToken")
        }
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
                setArrayValues(res.data.list);
            }
            else if (res.status === "EXPIRED_TOKEN") {
                Navigate("/login");
            }
           
        })
        .catch(e => console.log("error : " + e));

}, [])
    return [arrayValues, setArrayValues];
}
export default useGetAllCategories;