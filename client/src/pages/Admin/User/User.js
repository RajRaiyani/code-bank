import useGetAllUser from "../../../hooks/useGetAllUser";
import UserCard from "../../../components/Cards/UserCard";
import changeUserRole from "../../../utilities/APIcalls/changeUserRole";
import { useNavigate } from "react-router-dom";
import deleteUser from "../../../utilities/APIcalls/deleteUser";

const User = () => {
	const [user, setUser] = useGetAllUser();
	const navigate = useNavigate();

	async function changerole(id) {
		await changeUserRole(id, () => { navigate("/login") });
		var temp = [...user];
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

	async function deleteData(id) {
		console.log(id);
		const confirmDelete = window.confirm('Are you sure you want to delete this user?');
		if (confirmDelete) {
			deleteUser(id, () => { navigate("/login") });
			var temp = [...user];
			setUser(temp.filter((e) => { return e._id !== id }));
		}
	}


	function PrintUser(data) {
		return data.map((val, index) => <UserCard className="m-1 w-full gc-shadow-22" onRoleChange={() => { changerole(val._id) }} username={val.username} email={val.email} role={val.role} key={index} onDelete={() => { deleteData(val._id) }} />)
	}

	return (
		<>
			<h2 className="text-3xl m-2 text-center">Users</h2>
			<div className="flex flex-col items-center w-full max-h-[80vh] overflow-y-auto">

				{PrintUser(user.filter(val => val.role === "admin"))}
				{PrintUser(user.filter(val => val.role !== "admin"))}

			</div>
		</>
	)
}

export default User;