
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdDeleteForever } from "react-icons/md"
import { BiSolidUser } from "react-icons/bi"


export function UserCard(props) {
	const space = " ";
	const [menuState, setManuState] = useState(false);

	return (
		<div className={"border max-w-[550px] rounded-md p-2 flex justify-between items-center"+space+props.className} style={props.style} onClick={props.onClick}>
			<div>
				<div className="flex items-center">
					<div className="text-2xl flex items-center justify-center me-2 h-10 w-10 rounded-full border-4 gc-border-green font-bold">{props.username[0].toUpperCase()}</div>
					<div>
						<div className="text-xl flex items-center font-bold">{props.username}{props.role === "admin" ? <span className="text-sm font-normal text-red-500 mx-3">{props.role}</span> : <span className="text-sm mx-3 font-normal text-blue-500">{props.role}</span>}</div>
						<div className="text-sm font-light">{props.email}</div>
					</div>
				</div>
			</div>
			<div>
				<BsThreeDotsVertical onClick={()=>setManuState((pri)=>!pri)} className="text-2xl hover:scale-110 duration-300" />
				{
					menuState && <div className="absolute p-2 border bg-white rounded-md gc-border-green -translate-x-full -translate-y-1/2">
									<div onClick={props.onDelete} className="flex items-center my-1 hover:scale-105 duration-200"><MdDeleteForever className="text-2xl mx-1 text-red-600" />Delete</div>
									<hr/>
									<div onClick={props.onRoleChange} className="flex items-center my-1 hover:scale-105 duration-200">
										{props.role==="admin"?<BiSolidUser className="text-xl mx-1 text-blue-500" />:<BiSolidUser className="text-xl mx-1 text-red-600" />}
										Role
									</div>
								</div>
				}

			</div>
		</div>
	)
}

export default UserCard;