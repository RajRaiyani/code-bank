
import { AiOutlineHeart } from "react-icons/ai"
import { FaCircle } from "react-icons/fa"
import { MdOutlineDeleteForever } from "react-icons/md"
import { FiEdit } from "react-icons/fi"


export const QuestionCard = (props) => {

	var space = " ";

	function AdminControls() {
		if (!props.admin) return (<></>);
		return (
			<div className="flex ms-5 items-center">
				<MdOutlineDeleteForever onClick={(e)=>{e.stopPropagation(); props.onDelete && props.onDelete();}} className="text-red-500 text-3xl mx-2 hover:scale-110" />
				<FiEdit onClick={(e)=>{e.stopPropagation(); props.onEdit && props.onEdit();}} className="text-2xl mx-2 hover:scale-110" />
			</div>
		)
	}

	function Level() {
		var questionLevel = props.level.toLowerCase();
		if (questionLevel === "hard") return (<FaCircle className="text-red-600" />);
		if (questionLevel === "medium") return (<FaCircle className="text-orange-400" />);
		if (questionLevel === "easy") return (<FaCircle className="gc-text-green" />);
	}

	var titleClass = props.admin ? "max-w-[70%]" : "max-w-[90%]";

	return (
		<div className={"flex max-w-[1200px] justify-between items-center border rounded-lg px-3 py-1 bg-white" + space + props.className} style={props.style} onClick={props.onClick}>
			<div className={titleClass}>
				<div className="truncate"><span className="me-2 text-lg font-bold">{props.number}</span>{props.title}</div>
				<div className="text-sm flex items-center"><Level />&nbsp;Level</div>
			</div>
			<div className="flex">
				<div className="text-center">
					<AiOutlineHeart className="mx-auto text-xl gc-text-green" />
					<div className="text-sm">{props.likes}</div>
				</div>
				<AdminControls />
			</div>

		</div>
	);
}

export default QuestionCard;