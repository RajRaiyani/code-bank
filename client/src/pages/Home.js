

import { Link } from "react-router-dom";
import { QuestionCard } from "../components/Cards/QuestionCard";
import QuestionCount from "../components/Cards/QuestionCount";


function editQuestion(e){
	e.preventDefault();
	console.log("edit");
}
function deleteQuestion(e){
	e.preventDefault();
	console.log("delete");
}



const Home = () => {
	return(
	<>
		<div className="w-2/3  mx-4 my-2 p-3 gc-shadow-25 rounded ">
			<Link to="/Question/34234">
			<QuestionCard className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="Easy" />
			</Link>
			<Link to="/Question/3423344">
			<QuestionCard onDelete={deleteQuestion} onEdit={editQuestion} admin={true} className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="hard" />
			</Link>
			<QuestionCard className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="Easy" />
		</div>

		<Link to="admin">Admin</Link>
		<QuestionCount className="m-4" />
		
	</>

	
	);
}

export default Home;