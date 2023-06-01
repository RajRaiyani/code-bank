
import { useState } from "react";

import "../../../index.css";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import QuestionDatach from "../../../Hooks/useQuestionData";

const AdminAddProgram = () => {
	const navigate = useNavigate();
	const [dataforpop, setdatapop] = useState("")
	const [data1, setData1] = QuestionDatach();
	const [message, setMessage] = useState("");
	var [data, setData] = useState({ language: "", code: "" });

	function checkNavigate(id) {

		if (!Cookies.get("adminToken")) {
			navigate("login");
		}
		else {
			navigate("/admin/Program/" + id);
		}


	}



	function assigendata(props) {
		setdatapop(props);
	}


	function handleDatasolution(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	function DeleteData(props) {

		fetch("http://localhost:3007/api/v1/admin/question/delete/", {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			},
			body: JSON.stringify({ question_id: props })
		}).then(res => res.json())
			.then(res => {
				console.log(res)
				if (res.status === "OK") {
					setData1(data1.filter((element) => element._id !== props));
				}
				else {
					setMessage(res.message);
				}

			})
			.catch((e) => {
				console.log(e);
			})

	}








	function GetDataF() {
		return data1.map(program => {
			return (



				<>




					<tr key={program._id} onClick={() => { checkNavigate(program._id) }} className="QuestionBox">
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
						<td><button type="button" className="btn btn-outline-danger position-absolute" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={(e) => { e.stopPropagation(); assigendata(program) }} >DELETE</button></td>

					</tr>





				</>
			);
		})
	}





	// ============================
	return (
		<>


			<div className="d-flex justify-content-between">
				<Link to="/admin/Program/AddQuestion">
					<button type="button" className="btn btn-outline-success m-5 fs-4">
					Add Question+
					</button>
				</Link>
				<Link to="/admin/Program/MangeCatagory">
					<button type="button" className="btn btn-outline-success m-5 fs-4">
						Add catagory+
					</button>
				</Link>

				<Link to="/admin/Program/MangeLanguage">
					<button type="button" className="btn btn-outline-success m-5 fs-4">
						Add language+
					</button>
				</Link>
			</div>
			{/* delete pop op */}
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
							<button type="button" className="btn btn-primary" onClick={() => { DeleteData(dataforpop._id) }}
							>Confirm</button>

							<button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
						</div>

					</div>
				</div>
			</div>


			{/* add solution pop op  */}
			<div className="modal fade" id="exampleModal3" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">

							<h1 className="modal-title fs-5" id="exampleModalLabel">
								ADD SOLUTIONS<br />
								<div className="text-danger">{message}</div>

							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<label className="form-label ps-0">chose language</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Language" name="number"
								onChange={handleDatasolution} value={data.language} />
							<label className="form-label">code</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="code" name="question"
								onChange={handleDatasolution} value={data.code} />
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
								data-bs-dismiss="modal" >ADD</button>
						</div>

					</div>
				</div>
			</div>


			<div className="container-sm">
				<table className="table table-light border text-center">
					<thead>
						<tr>
							<th>Program Number</th>
							<th>Program level</th>
							<th>Program Question</th>
							<td><b>Delete Options</b></td>



						</tr>
					</thead>
					<tbody><GetDataF /></tbody>

				</table>
			</div>
			



		</>
	)
}
export default AdminAddProgram;