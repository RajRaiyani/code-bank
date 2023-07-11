import { useEffect, useState } from "react";
import { useParams ,Link} from "react-router-dom";
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
			body: JSON.stringify({question_id:data.question_id , language:data.language , code:data.code , title:data.title})
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
      <div className="overflow-auto w-100" style={{ height: "100vh" }}>
        <div className="container " style={{ marginTop: "2rem" }}>
          <h1>Add solution</h1>
          <h3 className="text-danger">{message}</h3>
		  <label for="language" class="form-label"> Select Languages :</label>
          <select
			className="form-select mb-3"
            name="language"
            id="language"
            value={data.language}
            onChange={handleChange}
          >
            <option disabled selected hidden>
              select language
            </option>
            <Languages />
          </select>
		  <label for="formGroupExampleInput" class="form-label">
              Enter a Tile :
            </label>
              <input
			  	rows={4}
                className="form-control mb-3"
                id="formGroupExampleInput"
                type="text"
          name="title"
          placeholder="brute force approach"
          onChange={handleChange}
              />
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">
              Enter a Solution :
            </label>
          
              <input
			  	rows={4}
                className="form-control mb-3"
                id="formGroupExampleInput"
                type="text"
          name="code"
          placeholder="<code>"
          onChange={handleChange}
              />
              <button className="btn btn-primary" onClick={submit}>
                Add Solution
              </button>
          </div>
        </div>
      </div>
    );
}

export default AddSolution;