import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
const AddSolution = () => {
    const { id } = useParams();
	var [languages, setLanguages] = useState([]);
	var [data, setData] = useState({question_id: id});
	var [message,setMessage]=useState("");

    useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/list/get/language", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					setLanguages(res.data.list);
				} else {
					console.log(res);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}, [])
    function Languages() {
		return languages.map(e => (
			<option key={e} value={e}>{e}</option>
		))
	}
    function handleChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}
	function submit()
	{

		fetch("http://localhost:3007/api/v1/admin/solution/add", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			},
			body: JSON.stringify({question_id:data.question_id , language:data.language , code:data.code})
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					setMessage("add solution succesfully");
				} else {
					console.log(res);
					setMessage(res.message);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}

    return (
        <>
		{message} 
		<br></br>
            <select name="language" id="language" value={data.language} onChange={handleChange}>
				<option disabled selected hidden>select language</option>
                <Languages />
            </select><br />
			<input type="text" name="code" placeholder="<code>" onChange={handleChange} />
			<input type="submit" onClick={submit} />

        </>
    )
}

export default AddSolution;