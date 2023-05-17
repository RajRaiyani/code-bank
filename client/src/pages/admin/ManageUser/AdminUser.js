import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminUser = () => {
    const navigate=useNavigate();
	const [tempdata,settempdata]=useState([]);
    const [userdata , UsersetData]=useState([]);
	const [admindata , adminData]=useState([]);

    const [Message,setMessage]=useState();

    useEffect(()=>{
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

    } , [])
	function Dataprint()
	{
		return tempdata.map(e => {
			return (
				<>
			<tr key={e._id}  className="QuestionBox">
						
						<td className="py-3 text-success">{e.name}</td>
						<td className="py-3">{e.email}</td>
						<td>
						<button type="button" className="btn btn-outline-danger position-absolute" data-bs-toggle="modal" data-bs-target="#exampleModal2"  >DELETE</button>
						</td>
						<td>
						<button type="button" className="btn btn-outline-primary position-absolute" data-bs-toggle="modal" data-bs-target="#exampleModal2"  >edit</button>
						</td>				
					</tr>

			</>
		)
		})
	}
    return (
        <>
            <div className="container-sm">
				<table className="table table-light border text-center">
					<thead>
						<tr>
							<th>User Name</th>
							<th>User Email Addres </th>
							<th>Delete </th>

						</tr>
					</thead>
					<tbody> <Dataprint/></tbody>


				</table>
			</div>
           
        </>
    )
}
export default AdminUser;