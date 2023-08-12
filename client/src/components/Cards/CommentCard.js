
import {MdDeleteForever} from "react-icons/md"


const CommentCard = (props) => {
	var space = " ";
	return (
		<div className={"p-3 border max-w-[700px] rounded-md"+space+props.className} onClick={props.onClick}>
			<div className="flex justify-between">
				<div className="text-xl flex items-center"><span className="flex items-center me-2 justify-center h-10 w-10 rounded-full border-4 gc-border-green text-center text-2xl font-bold align-middle ">{props.userName[0].toUpperCase()}</span>{props.userName}</div>
				<div className="text-sm">{props.date}</div>
				{
					props.admin===true && <MdDeleteForever onClick={props.onDelete} className="text-3xl hover:scale-110 duration-300 text-red-600" />
				}
			</div>
			<div className="pt-3 pb-2">
				{props.comment}
			</div>
		</div>
	)
}

export default CommentCard;