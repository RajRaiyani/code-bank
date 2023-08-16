import useGetAllUser from "../../../hooks/useGetAllUser";
import UserCard from "../../../components/Cards/UserCard";
import changeUserRole from "../../../utilities/APIcalls/changeUserRole";
import { useNavigate } from "react-router-dom";
import deleteUser from "../../../utilities/APIcalls/deleteUser";

const User = () => {
	 const [user, setUser] = useGetAllUser();
	 const navigate=useNavigate();

	async function changerole(id)
	{
		await changeUserRole(id,()=>{navigate("/login")});
		var temp=[...user];
		setUser(temp.map((e) => {
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
	async function deleteData(id)
	{	
		console.log(id);
	const confirmDelete = window.confirm('Are you sure you want to delete this user?');
	if (confirmDelete) {
		deleteUser(id,()=>{navigate("/login")});
		var temp=[...user];
		setUser(temp.filter((e)=>{return e._id!==id}));
	}
}

	var admindetails , userdetails;
	if(user!==undefined)
	{

		admindetails = user.map((e, index) => {
		if(e.role==="admin")
		return(<UserCard onRoleChange={()=>{changerole(e._id)}} username={e.username} email={e.email} role={e.role} key={index} onDelete={()=>{deleteData(e._id)}}/>	)
	})
	userdetails = user.map((e, index) => {
		if(e.role!=="admin")
		return(<UserCard onRoleChange={()=>{changerole(e._id)}} username={e.username} email={e.email} role={e.role} key={index} onDelete={()=>{deleteData(e._id)}} />	)
	})

}
	return(
		<div className="ms-10 overflow-y-auto h-full p-2 gc-shadow-14-normal max-w-[550px]">
			{admindetails }
			{userdetails}
		</div>
	)
}

export default User;