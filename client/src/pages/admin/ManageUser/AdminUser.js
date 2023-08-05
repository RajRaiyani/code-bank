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
				return (<div key={e._id} className=" main_box row">

					<div className="py-3 col-2">{e.name}</div>
					<div className="py-3 col-4 text-dark">{e.email}</div>
					<div className="py-3 col-2 text-danger">{e.role}</div>

					<div className="col-2">
						<button type="button" className="btn btn-outline-danger position-absolute" onClick={() => { deleteF(e._id) }}  >DELETE</button>
					</div>
					<div className="col-2">
						<button type="button" className="btn btn-outline-primary position-absolute" onClick={() => { changerole(e._id) }} >edit</button>
					</div>
				</div>)
			}
		})



	}

	function DataprintUSer() {
		return tempdata.map(e => {
			if (e.role === "user") {
				return (<div key={e._id} className=" main_box row">

				<div className="py-3 col-2">{e.name}</div>
				<div className="py-3 col-4 text-dark">{e.email}</div>
				<div className="py-3 col-2 text-primary">{e.role}</div>

				<div className="col-2">
					<button type="button" className="btn btn-outline-danger position-absolute" onClick={() => { deleteF(e._id) }}  >DELETE</button>
				</div>
				<div className="col-2">
					<button type="button" className="btn btn-outline-primary position-absolute" onClick={() => { changerole(e._id) }} >edit</button>
				</div>
			</div>)
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
			<div className="container m-2">
				<div className="row">
							<div className="col-2">User Name</div>
							<div className="col-4">User Email Addres </div>
							<div className="col-2">Admin/User</div>
							<div className="col-2">Delete </div>
							<div className="col-2">Edit</div>
							</div>
						<DataprintAdmin />
						<DataprintUSer></DataprintUSer>



			</div>

		</>
	)
}
export default AdminUser;