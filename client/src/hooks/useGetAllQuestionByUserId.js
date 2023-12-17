import Cookies from "js-cookie";
import { useEffect, useState } from "react";
 function useGetAllQuestionByUserID () {
	const [getAllData, setAllData] = useState([]);

	 useEffect(() => {
		 fetch(`${process.env.REACT_APP_SERVER_URL}/api/v2/user/getQuestionByUserId`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("superuserToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setAllData(res.data);
				}
				else{
					console.log(res);
				}
			})
			.catch(e => console.log("error : " + e));
	}, []);
	return [getAllData , setAllData];
}

export default useGetAllQuestionByUserID;