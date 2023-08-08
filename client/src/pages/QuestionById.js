
import { SolutionCard } from "../components/Cards/SolutionCard";


const styleForSolution = {
	boxShadow:"0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}
const styleForSolutionTitle = {
	boxShadow:"0px 5px 15px 0px rgba(50, 130, 50, 0.35)"
}

const QuestionById=()=>{
	
	const code = `public static void main(String[] args){
		System.out.println("hello world");
		int a = 53;
	}`

	return(
		<div className="w-2/3 h-[40%]  mx-4 my-2 p-4 rounded ">
			<SolutionCard style={styleForSolution} titleStyle={styleForSolutionTitle} title="This is Title" solution={code} language="java" />
			<SolutionCard admin={true} style={styleForSolution} titleStyle={styleForSolutionTitle} title="This is Title" solution={code} language="java" />
			
		</div>
	);
}


export default QuestionById;