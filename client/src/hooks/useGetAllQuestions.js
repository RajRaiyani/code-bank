import Cookies from "js-cookie";
import { useEffect, useState } from "react";
function useGetAllQuestions () {
	const [getAllData, setAllData] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/home/question`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("userToken")
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

export default useGetAllQuestions;