import useGetAllUser from "../../../hooks/useGetAllUser";
import UserCard from "../../../components/Cards/UserCard";


const User = () => {
	 const [user, setUser] = useGetAllUser();
	console.log(user);
	var UserCardprint;
	if(user!==undefined)
	{

	 UserCardprint = user.map((e, index) => {
		return(
			<div key={index} >
			
			<UserCard onRoleChange={()=>console.log("change role")} username={e.username} email={e.email} role={e.role} />

			</div>
				
		)
	})
}
	return(
		<div className="ms-10 overflow-y-auto h-full p-2 gc-shadow-14-normal max-w-[550px]">
			{UserCardprint }
		</div>
	)
}

export default User;