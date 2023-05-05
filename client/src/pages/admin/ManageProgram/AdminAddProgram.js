import { useState } from "react";
import cookie from "js-cookie";

const AdminAddProgram = () => {

    const [message, setMessage] = useState("");

    var [data, setData] = useState({ number: 3, question: "fuajsydfu", categories: ["hard","arry"],level:"jkhdfjkahf",solutions:[{language:"dsfsf" ,code:"dfsdfsdf"}] });
	
	function handleData(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}
	function sendData() {
        console.log("hit")
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
					setData({ number: "", question: "", catagory: [{}],level:"",solution:[{language:"" ,code:""}] });
				}
                else{
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
                                Add Question<br/>
                            <div className="text-danger">{message}</div>
                            </h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<label className="form-label">Item Number</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Item Number" name="number"
								onChange={handleData} value={data.number} />
							<label className="form-label">Item Name</label>
							<input type="text" className="form-control border-dark mb-2" placeholder="Item Name" name="question"
								onChange={handleData} value={data.question} />
							<label className="form-label">Item Name</label>
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
								onClick={sendData}>add</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container-sm">
			<table className="table table-light border text-center">
				<thead>
					<tr>
						<th>Number</th>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				{/* <tbody>
					<Items />
				</tbody> */}
			</table>
			</div>
			
        </>

    )
}

export default AdminAddProgram;