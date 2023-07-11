import { useEffect, useState } from "react";
import cookie from "js-cookie";

var QuestionDatach = () => {
	
	const [getdata, setGetdata] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/question", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("userToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setGetdata(res.data);
				}
				else{
					console.log(res);
				}
			})
			.catch(e => console.log("error : " + e));
	}, []);
	return [getdata , setGetdata];
}

export default QuestionDatach;