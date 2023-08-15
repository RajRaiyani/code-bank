import { useState } from "react";
import useGetAllLanguages from "../../../../hooks/useGetAllLanguages";
import { useNavigate, useParams } from "react-router-dom";
import addSolution from "../../../../utilities/APIcalls/addSolution";


const AddEditSolution = (props) => {
    const { id } = useParams();
	const navigate=useNavigate();
	var [languages] = useGetAllLanguages();
	var [data, setData] = useState({question_id: id});
	var [message,setMessage]=useState("");

	function Languages() {
		return languages.map(e => (
			<option key={e} value={e}>{e}</option>
		))
	}
	function handleChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}
	async function sendData(id)
	{
		
		await addSolution(data,setMessage,()=>{navigate(`/admin/question/${id}`)},()=>{navigate("/login")})
	}
	return (
		<div>
			<h1>Add and Edit Solution Page</h1>
			<h1>{props.edit?"true":"false"}</h1>


			<div className="container " style={{ marginTop: "2rem" }}>
          <h4>Add solution</h4>
          <h3 >{message}</h3>
		   Select Languages :
          <select
		  className="border gc-border-green  rounded-sm"
            name="language"
            id="language"
            value={data.language}
            onChange={handleChange}
          >
            
            <Languages />
          </select>
		  <br/>
              Enter a Tile :
              <textarea
			  	cols={50}
                className="form-control mb-3"
                type="text"
          name="title"
          placeholder="brute force approach"
          onChange={handleChange}
              />
          <div className="mb-3">
              Enter a Solution :
          
              <textarea
			  	rows={4}
                id="formGroupExampleInput"
                type="text"
          name="code"
          placeholder="<code>"
          onChange={handleChange}
              />
              <button className="border gc-border-green" onClick={()=>{sendData(id)}}>
                Add Solution
              </button>
          </div>
        </div>
		</div>
	)
}

export default AddEditSolution;