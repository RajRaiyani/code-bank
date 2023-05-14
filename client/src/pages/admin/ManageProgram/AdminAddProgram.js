import {  useState } from "react";
import cookie from "js-cookie";
import QuestionDatach from "../../../Hooks/useQuestionData";

const AdminAddProgram = () => {

	const [data1, setData1]=QuestionDatach();

	function GetDataF() {
		return data1.map(program => {
			return (
				<tr key={program._id}>
					<td className="py-3">{program.number}</td>
					{program.level === "esay"?(
						<td className="py-3 text-success">{program.level}</td>
					):(
						(program.level==="hard")?(
							<td className="py-3 text-danger">{program.level}</td>
						):(
							<td className="py-3 text-warning">{program.level}</td>
						)
						
					)}
					<td className="py-3">{program.question}</td>
					
				</tr>
			);
		})
	}


	// add question 

	const [message, setMessage] = useState("");

	var [data, setData] = useState({ number: 1, question: "add two numbers ", categories: ["", "arry"], level: "esay", solutions: [{ language: "java", code: "sout" }] });

	function handleData(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}
	function sendData() {
		fetch("http://localhost:3007/api/v1/admin/question/add", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": cookie.get("token")
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
			.then(res => {

				if (res.status === "ok") {
					setData1([...data1,res.data]);
					setData({ number: "", question: "", catagory: [{}], level: "", solution: [{ language: "", code: "" }] });
				}
				else {
					setMessage(res.message);
				}

			})
			.catch((e) => {
				console.log(e);
			})

	}
	return (
		<>
			<div className="d-flex justify-content-between">
				
				<button type="button" className="btn btn-outline-success m-5 fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
					Add +
				</button>
			</div>


			<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">

							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Add Question<br />
								<div className="text-danger">{message}</div>
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<label className="form-label">Program Number</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Item Number" name="number"
								onChange={handleData} value={data.number} />
							<label className="form-label">Program question</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Item Name" name="question"
								onChange={handleData} value={data.question} />
							<label className="form-label">Program Name</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Item Name" name="categories"
								onChange={handleData} value={data.categories} />
							<label className="form-label">Item Name</label>

							<input type="text" className="form-control border-dark mb-2" placeholder="Item Name" name="level"
								onChange={handleData} value={data.level} />
							<label className="form-label">categories</label>
							<input type="text" className="form-control border-dark" placeholder="categories" name="solutions"
								onChange={handleData} value={data.solutions} />


						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
								onClick={sendData} data-bs-dismiss="modal">add</button>
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

						</tr>
					</thead>
					<tbody><GetDataF/></tbody>
					
				</table>
			</div>

		</>

	)
}

export default AdminAddProgram;