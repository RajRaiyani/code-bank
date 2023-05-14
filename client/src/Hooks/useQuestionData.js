import { useEffect, useState } from "react";
import cookie from "js-cookie";

var QuestionDatach = () => {
	

	const [getdata, setGetdata] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/question", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "ok") {
					setGetdata(res.data);
				}
			})
			.catch(e => console.log("error : " + e));
	}, []);

	return [getdata , setGetdata];
}

export default QuestionDatach;