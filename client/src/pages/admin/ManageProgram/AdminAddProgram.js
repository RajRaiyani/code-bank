import { useEffect, useState } from "react";
import cookie from "js-cookie";
import QuestionDatach from "../../../Hooks/useQuestionData";
import AllQuestion from "../../../utilities/AllQuestion";
import CreateList from "../../List/createList";

const AdminAddProgram = () => {

	const [createListMessage , steCreateListMessage]=CreateList("java");
	const [status,setStatus]=useState("true");
	const [data1, setData1] = QuestionDatach();
	const [inputValue, setInputValue] = useState('');
	const [arrayValues, setArrayValues] = useState([]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleAddToArray = () => {
		if (inputValue !== '') {
			setArrayValues([...arrayValues, inputValue]);
			setInputValue('');
		}
	};



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
				"token": cookie.get("adminToken")
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
			.then(res => {

				if (res.status === "OK") {
					setData1([...data1, res.data]);
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

				<button type="button" className="btn btn-outline-success m-5 fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal1">
					Add catagory+
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
							<input type="text" className="form-control border-dark mb-2" placeholder="Program Number" name="number"
								onChange={handleData} value={data.number} />
							<label className="form-label">Program question</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Program Name" name="question"
								onChange={handleData} value={data.question} />
							<label className="form-label">Program categories</label>
							<br></br>
							<div>
									{arrayValues.map((value, index) => (
										<li key={index}>{value}</li>
									))}
							</div>

							<input type="text" className="form-control border-dark mb-2" placeholder="Program categories" name="categories"
								onChange={handleData} value={data.categories} />
							<label className="form-label">Program level</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Program level" name="level"
								onChange={handleData} value={data.level} />
							<label className="form-label">Program solutions</label>
							<input type="text" className="form-control border-dark" placeholder="program solution" name="solutions"
								onChange={handleData} value={data.solutions} />


						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
								onClick={sendData} data-bs-dismiss="modal">add</button>
						</div>
					</div>
				</div>
			</div>


			{/* add catagories */}
			<div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">

							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Add catagory<br />
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div>
								<input type="text" value={inputValue} onChange={handleInputChange} />
								<button onClick={handleAddToArray}>Add to Array</button>
								<ul>
									{arrayValues.map((value, index) => (
										<li key={index}>{value}</li>
									))}
								</ul>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary"
								 data-bs-dismiss="modal">Back</button>
						</div>

					</div>
				</div>
			</div>
			{createListMessage}

		</>

	)
}

export default AdminAddProgram;