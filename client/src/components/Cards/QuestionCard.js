
import {AiOutlineHeart} from "react-icons/ai"
import {FaCircle} from "react-icons/fa"
import {MdOutlineDeleteForever} from "react-icons/md"
import {FiEdit} from "react-icons/fi"




export const QuestionCard = (props)=>{
	var space = " ";
	


	function AdminControls(){
		if(!props.admin)return(<></>);
		return(
		<>
			<MdOutlineDeleteForever onClick={props.onDelete} className="text-red-500 text-3xl relative z-10" />
			<FiEdit onClick={props.onEdit} className="text-2xl relative z-10" />
		</>
		)
	}

	function Level(){
		var questionLevel = props.level.toLowerCase();
		if(questionLevel==="hard")return(<FaCircle className="text-red-600" />);
		if(questionLevel==="medium")return(<FaCircle className="text-orange-400" />);
		if(questionLevel==="easy")return(<FaCircle className="gc-text-green" />);
	}

	return(
		<div className={"flex justify-between items-center border rounded-lg px-3 py-1 bg-white"+space+props.className} style={props.style}>
			<div>
				<div><span className="me-2 text-lg font-bold">{props.number}</span>{props.title}</div>
				<div className="text-sm flex items-center"><Level />&nbsp;Level</div>
			</div>
			<div className="text-center">
				<AiOutlineHeart  className="mx-auto text-xl gc-text-green" />
				<div className="text-sm">{props.likes}</div>
			</div>
			<AdminControls />

		</div>
	);
}