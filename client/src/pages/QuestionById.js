
import { useParams } from "react-router-dom";
import { SolutionCard } from "../components/Cards/SolutionCard";
import useGetQuestionDataById from "../hooks/useGetQuestionByID";
import { FaCircle } from "react-icons/fa";
import { useState } from "react";

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
	console.log(data.level)
	const printSolution = data.solutions.map((e, index) => {
		return (
			<SolutionCard style={styleForSolution} titleStyle={styleForSolutionTitle} title={e.title} solution={e.code} language={e.language} key={index} className="my-6" />
		)
	})
	function Level(arg) {
		if (arg.level === undefined) return (<></>);
		var questionLevel = arg.level.toLowerCase();
		if (questionLevel === "hard") return (<FaCircle className="text-red-600 mt-1" />);
		if (questionLevel === "medium") return (<FaCircle className="text-orange-400 mt-1" />);
		if (questionLevel === "easy") return (<FaCircle className="gc-text-green mt-1" />);
	}

	const Discription = () => {
		return (
			<><div className="mt-4">
				<span className=" text-2xl font-bold">{data.number}</span>
				<span className="text-xl p-2 font-light">{data.title}</span>
				<div className="flex"><Level level={data.level} />level</div>
			</div>
				<div className="w-full md:h-[70vh] border gc-border-green p-4 rounded-md">{data.question}</div>
			</>
		)
	}
	return (<>
		<div className="md:flex my-2">
			<div className="md:w-1/2 mx-4 my-2 p-4 rounded">
				<button className={`btn rounded-l-lg  p-2 text-white ${togal === true ? "bg-[#7cc529]" : "hover:bg-[#7cc529] hover:text-white border gc-border-green text-black "} `} onClick={() => { settogal(true) }}>Discription</button>
				<button className={`btn rounded-r-lg  p-2 ms-1 text-white ${togal === false ? "bg-[#7cc529]" : "hover:bg-[#7cc529] hover:text-white border gc-border-green text-black "} `} onClick={() => { settogal(false) }}>Comments</button>
				{togal === true ? <Discription /> : <>Comments</>}
			</div>
			<div className="md:w-1/2 h-[85vh]  mx-4 my-2 p-4 rounded overflow-auto gc-shadow-25 ">{printSolution}</div>
		</div>
	</>
	);
}
export default QuestionById;