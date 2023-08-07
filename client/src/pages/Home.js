

import { QuestionCard } from "../components/Cards/QuestionCard";

function editQuestion(){
	console.log("edit");
}
function deleteQuestion(){
	console.log("delete");
}

const Home = () => {
	return(
		<div className="w-2/3 h-[97%] mx-4 my-2 p-3 gc-shadow-25 rounded ">
			<QuestionCard callBacks={{editQuestion,deleteQuestion}} admin={true} className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="Easy" />
			<QuestionCard className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="Easy" />
			<QuestionCard className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="Easy" />
		</div>
	);
}

export default Home;