import { useState } from "react";
import QuestionDatach from "../Hooks/useQuestionData";
import "../index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AllQuestion = (props) => {
	const navigate = useNavigate();
	const [dataforpop, setdatapop]=useState("")
	const [propsd,setpropsd]=useState(props.status);
	const [data1, setData1] = QuestionDatach();
	function checkNavigate(id,status) {
		if(!status.propsd)
		{
		if (!Cookies.get("userToken")) {
			navigate("login");
		}
		else {
			navigate("/user/question/" + id);
		}
	}
}
console.log(dataforpop.number)

	function moreQ(id)
	{
		navigate("/user/question/" + id);
	}
	

	function deleteQuestion(program,status) {
		if(status.propsd==="true")
		{
			console.log(program);
		}

	}

	




	function GetDataF() {
		return data1.map(program => {
			return (
				<>
				<tr key={program._id}	onClick={() => { checkNavigate(program._id , {propsd}) }} className="QuestionBox">
					<td className="py-3">{program.number}</td>
					{program.level === "esay" ? (
						<td className="py-3 text-success">{program.level}</td>
					) : (
						(program.level === "hard") ? (
							<td className="py-3 text-danger">{program.level}</td>
						) : (
							<td className="py-3 text-warning">{program.level}</td>
						)

					)}
					<td className="py-3">{program.question}</td>
					{props.status === "true" ? (<td><button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={()=>{setdatapop(program)}} >DELETE</button></td>) : (<></>)}
					{props.status === "true" ? (<td><button type="button" className="btn btn-outline-primary" onClick={()=>{moreQ(program._id)}} >More</button></td>) : (<></>)}
					{/* onClick={()=>{deleteQuestion(program , {propsd})}} */}
				</tr>

<div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
	<div className="modal-content">
		<div className="modal-header">

			<h1 className="modal-title fs-5" id="exampleModalLabel">
				DELETE QUESTION<br />
			</h1>
			<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div className="modal-body">
			{dataforpop.number}
		</div>
		<div className="modal-footer">
			<button type="button" className="btn btn-primary"
				 data-bs-dismiss="modal">Confirm</button>
		</div>

	</div>
</div>
</div>
</>
			);
		})
	}
	return (
		<>
			<div className="container-sm">
				<table className="table table-light border text-center">
					<thead>
						<tr>
							<th>Program Number</th>
							<th>Program level</th>
							<th>Program Question</th>
							{props.status === "true" ? (<td><b>Delete Options</b></td>) : (<></>)}
							{props.status === "true" ? (<th>about Question</th>) : (<></>)}


						</tr>
					</thead>
					<tbody><GetDataF /></tbody>

				</table>
			</div>


			
		</>
	)
}
export default AllQuestion;