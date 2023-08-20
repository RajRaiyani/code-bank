import {  useState } from "react";
import useGetAllLanguages from "../../../../hooks/useGetAllLanguages";
import { useNavigate, useParams } from "react-router-dom";
import addSolution from "../../../../utilities/APIcalls/addSolution";
import useGetSolutionById from "../../../../hooks/useGetSolutionById";
import editSolution from "../../../../utilities/APIcalls/editSolution";


const AddEditSolution = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  var [languages] = useGetAllLanguages();
  var [data, setData] = useGetSolutionById(id, !props.edit);
  var [message, setMessage] = useState("");
  function Languages() {
    return languages.map(e => (
      <option key={e} value={e}>{e}</option>
    ))
  }
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function sendData(id) {
    if (!props.edit)
    {
    data.question_id = id;

      await addSolution(data, setMessage, () => { navigate(`/admin/question/${id}`) }, () => { navigate("/login") })
    }
    else {
      data.solution_id = id;
      await editSolution(data, setMessage, () => { navigate(`/admin/question/${data.question_id}`) }, () => { navigate("/login") })
    }
  }
  return (
    <div>

      <h1 className="text-center "> <span className="m-3 underline font-2">{!props.edit ? "Add " : "Edit "}Solution Page</span></h1>


      <div className="container " style={{ marginTop: "2rem" }}>
        <h3 >{message}</h3>
        Select Languages :
        <select
          className="border gc-border-green  rounded-sm"
          name="language"
          id="language"
          onChange={handleChange}
          value={data !== undefined ? data.language : ""}
        >

          <Languages />
        </select>
        <br />
        Enter a Tile :
        <textarea
          cols={50}

          className="form-control mb-3"
          type="text"
          name="title"
          value={data !== undefined ? data.title : ""}

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
            value={data !== undefined ? data.code : ""}
            placeholder="<code>"
            onChange={handleChange}
          />
          <button className="border gc-border-green" onClick={() => { sendData(id) }}>
           {!props.edit ? "Add " : "Edit "} Solution
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditSolution;