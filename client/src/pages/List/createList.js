import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const { useEffect, useState } = require("react")

const CreateList=(props)=>{
    const navigate=useNavigate();
    const [message,setMessage]=useState("catagory");
 
    useEffect(()=>{
        fetch("http://localhost:3007/api/v1/admin/list/create/language", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setMessage("list is created succesfully");
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
				else {
					setMessage(res.message);
				}
			})
			.catch(e => console.log("error : " + e));

    })
    return (
		<>
		{message}</>);
}

export default CreateList;