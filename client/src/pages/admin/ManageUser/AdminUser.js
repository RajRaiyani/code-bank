import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminUser = () => {
	const navigate = useNavigate();
	const [tempdata, settempdata] = useState([]);
	const [Message, setMessage] = useState();

	//api call for the get call user 
	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/user", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					settempdata(res.data);
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
				else {
					setMessage(res.message)
				}
			})
			.catch(e => console.log("error : " + e));

	}, [])

	function DataprintAdmin() {
		return tempdata.map(e => {
			if (e.role === "admin") {
				return (<tr key={e._id} className="QuestionBox">

					<td className="py-3">{e.name}</td>
					<td className="py-3 text-success">{e.email}</td>
					<td className="py-3 text-danger">{e.role}</td>

					<td>
						<button type="button" className="btn btn-outline-danger position-absolute" onClick={() => { deleteF(e._id) }}  >DELETE</button>
					</td>
					<td>
						<button type="button" className="btn btn-outline-primary position-absolute" onClick={() => { changerole(e._id) }} >edit</button>
					</td>
				</tr>)
			}
		})



	}

	function DataprintUSer() {
		return tempdata.map(e => {
			if (e.role === "user") {
				return (<tr key={e._id} className="QuestionBox">

					<td className="py-3 ">{e.name}</td>
					<td className="py-3 text-success">{e.email}</td>
					<td className="py-3 text-primary">{e.role}</td>

					<td>
						<button type="button" className="btn btn-outline-danger " onClick={() => { deleteF(e._id) }}  >DELETE</button>
					</td>
					<td>
						<button type="button" className="btn btn-outline-primary " onClick={() => { changerole(e._id) }} >edit</button>
					</td>
				</tr>)
			}
		})
	}



	//update array for change the role of user 
	function changeinarrya(id) {
		settempdata(tempdata.map((e) => {
			if (e._id === id) {
				if (e.role === "user") {
					e.role = "admin";
					return e;
				}
				else {
					e.role = "user";
					return e;

				}
			}
			return e;
		}))
	}
	//api call for the change role of user
	function changerole(id) {
		fetch("http://localhost:3007/api/v1/admin/user/" + id + "/changeRole", {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {

					changeinarrya(id);
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
				else {
					setMessage(res.message)
				}
			})
			.catch(e => console.log("error : " + e));

	}

	//api call for delete user 
	function deleteF(id) {

		fetch("http://localhost:3007/api/v1/admin/user/" + id + "/delete", {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					settempdata(tempdata.filter((e) => e._id !==id));
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
				else {
					setMessage(res.message)
				}
			})
			.catch(e => console.log("error : " + e));
	}


	// fucantion that print the data of user 




	return (
		<>
			<div className="container-sm">
				<table className="table table-light border text-center">
					<thead>
						<tr>
							<th>User Name</th>
							<th>User Email Addres </th>
							<th>Admin/User</th>
							<th>Delete </th>
							<th>Edit</th>

						</tr>
					</thead>
					<tbody>
						<DataprintAdmin />
						<DataprintUSer></DataprintUSer>
					</tbody>



				</table>
			</div>

		</>
	)
}
export default AdminUser;