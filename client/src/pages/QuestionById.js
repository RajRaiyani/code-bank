import { useParams , useNavigate } from "react-router-dom";
import { SolutionCard } from "../components/Cards/SolutionCard";
import useGetQuestionDataById from "../hooks/useGetQuestionByID";
import { FaCircle } from "react-icons/fa";
import { useState } from "react";
import Cookies from "js-cookie";
import CommentCard from "../components/Cards/CommentCard";
import postComment from "../utilities/APIcalls/postComment";

const styleForSolution = {
	boxShadow: "0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}
const styleForSolutionTitle = {
	boxShadow: "0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}
const QuestionById = () => {
	const { id } = useParams();
	const [data] = useGetQuestionDataById(id);
	const [togal, settogal] = useState(true);
	const navigate=useNavigate();
	
	const printSolution = data.solutions.map((e, index) => {
		return (
			<SolutionCard style={styleForSolution} titleStyle={styleForSolutionTitle} title={e.title} solution={e.code} language={e.language} key={index} className="my-6" />
		)
	})
	function Level(arg) {
		if (arg.level === undefined) return (<></>);
		var questionLevel = arg.level.toLowerCase();
		if (questionLevel === "hard") return (<FaCircle className="text-red-600 mt-1 me-1" />);
		if (questionLevel === "medium") return (<FaCircle className="text-orange-400 mt-1 me-1" />);
		if (questionLevel === "easy") return (<FaCircle className="gc-text-green mt-1 me-1" />);
	}

	const Discription = () => {
		return (
			<>
				<div className="w-full md:h-[70vh] border gc-border-green p-4 rounded-md">{data.question}</div>
			</>
		)
	}
	const Comment=()=>{

		const [coments,setcommet]=useState(data.comments);
		const [commentMessage ,setcommetMessage]=useState("");

		async function sendData()
		{

			var newComment = await postComment(id,commentMessage,(res)=>{if(res!=undefined){navigate("/login")}})
			newComment.user = {"username":newComment.username}
			console.log(newComment)
			console.log(coments[0])
			
			setcommet([newComment,...coments]);
			setcommetMessage("");

		}
		
		return(
			<>
			<div className="text-xl mt-2 flex items-center"><span className="flex items-center me-2 justify-center h-10 w-10 rounded-full border-4 gc-border-green text-center text-2xl font-bold align-middle ">{Cookies.get("username")[0].toUpperCase()}</span>{Cookies.get("username")}</div>
			<div className="flex items-center mt-2 "><input type="text" value={commentMessage} className="w-full border-b gc-border-black  p-2 " placeholder="Write a comment" onChange={(e)=>{setcommetMessage(e.target.value)}}/><button className="gc-bg-green ms-4 text-white w-[110px] p-2 border rounded-lg hover:scale-110 duration-300" onClick={()=>{sendData()}}>POST</button></div>
			<div className="overflow-y-auto sm:mt-8 sm:ms-10 sm:me-10 h-[50vh]">
			{coments.map((e,index)=>{
					const date=new Date(e.date);
		
					return <CommentCard userName={e.user.username} className="m-2 mb-3 border-0 border-t border-s gc-border-green rounded-lg" comment={e.data} date={date.toDateString()} key={index}  />
				})
			}
			</div>
			</>
		)

		}
	return (<>
		<div className="md:flex my-2">
			<div className="md:w-1/2 mx-4 my-2 p-4 rounded">
				<button className={`btn rounded-l-lg  p-2 text-white ${togal === true ? "bg-[#7cc529] border gc-border-green" : " gc-text-black hover:bg-[#7cc529] hover:text-white border gc-border-green   "} `} onClick={() => { settogal(true) }}>Discription</button>
				<button className={`btn rounded-r-lg  p-2 ms-1 text-white ${togal === false ? "bg-[#7cc529] border gc-border-green" : "gc-text-black hover:bg-[#7cc529] hover:text-white border gc-border-green "} `} onClick={() => { settogal(false) }}>Comments</button>
				<div className="mt-4">
				<span className=" text-2xl font-bold">{data.number}</span>
				<span className="text-xl p-2 font-light">{data.title}</span>
				<div className="flex "><Level level={data.level} />level</div>
			</div>
				{togal === true ? <Discription /> : <><Comment/></>}
			</div>
			<div className="md:w-1/2 h-[85vh]  mx-4 my-2 p-4 rounded overflow-auto gc-shadow-25 ">{printSolution}</div>
		</div>
	</>
	);
}
export default QuestionById;