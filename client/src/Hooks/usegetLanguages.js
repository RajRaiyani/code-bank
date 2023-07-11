import { useEffect, useState } from "react";
import Cookies from "js-cookie";

var usegetLanguages = ({token}) =>{
    const [getLanguage,setLanguage] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3007/api/v1/home/list/get/language", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": Cookies.get(token)
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status === "OK") {
                    setLanguage(res.data.list);
                }
                else if (res.status === "EXPIRED_TOKEN") {
                    navigate("/login");
                }
                else {
                    setMessage(res.message);
                }
            })
            .catch(e => console.log("error : " + e));
    },[]);
    return [getLanguage, setLanguage];
}

export default usegetLanguages;