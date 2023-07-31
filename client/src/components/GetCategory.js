import Cookies from "js-cookie";
import { useState , useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../css/components.css"
function GetCatagary(props) {
  const [catagories , setCategories]=useState("");
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
    return (
      <>
        <div className="dropdown">
          <select value={catagories} onChange={(e)=>{setCategories(e.target.value)}} className="level-categories" >
          <option disabled selected hidden>
              Categories
            </option>
            <option> Categories</option>
            {arrayValues.map((value,index)=>{
              return (
                <option>{value}</option>
              )
            })}
              

          </select>
        </div>
      </>
    );
  }
  export default GetCatagary;