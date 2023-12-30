import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useGetAlldataByUser(id)
{
    const [data, setData] = useState({}); 
    const navigate=useNavigate();
    useEffect(() => {
		fetch("http://localhost:3007/api/v2/user/userdeatails/"+id, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setData(res.data);
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
			})
			.catch(e => console.log("error : " + e));

	}, [navigate , id])
    return [data, setData];
}

export default useGetAlldataByUser;