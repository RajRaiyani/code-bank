import useGetAllUser from "../../../hooks/useGetAllUser";
import UserCard from "../../../components/Cards/UserCard";
import { useNavigate } from "react-router-dom";
import deleteUser from "../../../utilities/APIcalls/deleteUser";


const User = () => {
	const [user, setUser] = useGetAllUser();
	const [tempdata ]=useGetAllUser();
	const navigate = useNavigate();

	

	async function deleteData(id) {
		const confirmDelete = window.confirm('Are you sure you want to delete this user?');
		if (confirmDelete) {
			deleteUser(id, () => { navigate("/login") });
			var temp = [...user];
			setUser(temp.filter((e) => { return e._id !== id }));
		}
	}


	function PrintUser(data) {
		return data.map((val, index) => <UserCard className="m-1 w-full gc-shadow-22" user={user} id={val._id} setUser={setUser} username={val.username} email={val.email} role={val.role} key={index} onDelete={() => { deleteData(val._id) }} />)
	}

	function searchUser(i)
	{
		setUser(user.filter((e)=>{return e.username.includes(i.target.value) || e.email.includes(i.target.value)}))
	}

	return (
		<>
			<h2 className="text-3xl m-2 text-center">Users</h2>
			<div><input type="text" className="px-2 w-[25vw] h-[7vh] text-3xl ml-[11vw]" onKeyDown={(e)=>{
				if(e.key==="Backspace")
				{setUser(tempdata)}}} onChange={(e)=>{searchUser(e)}}/></div>
			<div className="flex">
			<div className="flex flex-col justify-between items-center w-[50vw] max-h-[72vh] overflow-y-auto">
				{PrintUser(user.filter(val => val.role === "admin"))}
				{PrintUser(user.filter(val => val.role === "superuser"))}
				{PrintUser(user.filter(val => val.role === "user"))}
			</div>
			
			</div>
		</>
	)
}

export default User;