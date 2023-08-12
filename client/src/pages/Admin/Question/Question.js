

import { Link } from "react-router-dom";
import { useState } from "react";
import { QuestionCard } from "../../../components/Cards/QuestionCard";
import QuestionCount from "../../../components/Cards/QuestionCount";
import useGetAllQuestions from "../../../hooks/useGetAllQuestions";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
const LevelFillter = (arg) => {	

	return (
		<>
		<select className="border gc-border-green ms-4 mt-8 rounded-md text-lg" onChange={(e)=>{arg.setlevel(e.target.value)}} >
			<option value="">Level</option>
			<option value="Easy" >Easy</option>
			<option value="Medium">Medium</option>
			<option value="Hard">Hard</option>
			</select>		</>
	)
}
const CategoryFillter = (arg) => {
	const [Allcatagoies] = useGetAllCategories();

	return(
		<>
		<select className="border gc-border-green ms-4 mt-8 rounded-md text-lg" onChange={(e)=>{arg.setcategory(e.target.value)}} >
		<option value="">Categories</option>
			{Allcatagoies.map((data,index)=>{
				return(
					<option key={index} value={data}>{data}</option>
				)
			})}
			</select>
		</>
	)
}
const Home = () => {
	const [getAllData ] = useGetAllQuestions();
	const [level, setlevel] = useState("");
	const [category, setcategory] = useState("");
	const Easy = getAllData.filter((e) => e.level === "Easy");
	const Medium = getAllData.filter((e) => e.level === "Medium");
	const Hard = getAllData.filter((e) => e.level === "Hard");
	if(level!=="" && category!==""){
	var filterdata = level && category ? getAllData.filter((e) => e.level === level && e.categories.includes(category)) : getAllData;
	}
	else if(level!==""){
		 filterdata = level  ? getAllData.filter((e) => e.level === level ) : getAllData;

	}
	else
	{
		filterdata =  category ? getAllData.filter((e) =>  e.categories.includes(category)) : getAllData;
	}

	const printdata=filterdata.map((data,index)=>{
	return(
			<Link to={`/Question/${data._id}`} key={index}>
			<QuestionCard className="my-3 gc-shadow-23" number={data.number} title={data.title} likes={data.likes} level={data.level} />
			</Link>
	);
	})
	return(
		<>
			<LevelFillter setlevel={setlevel}/>
		<CategoryFillter setcategory={setcategory}/>
		<div className="flex">

		<div className="w-3/4  mx-4 my-2 p-3 gc-shadow-25 rounded ">
		{printdata}
		</div>
		<QuestionCount className="m-4" count={getAllData.length} Easy={Easy.length} Medium={Medium.length} Hard={Hard.length}/>
		</div>
		{/* <Link to="/Question/3423344">
			<QuestionCard onDelete={deleteQuestion} onEdit={editQuestion} admin={true} className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="hard" />
			</Link>
			<QuestionCard className="my-3 gc-shadow-23" number="43" title="This is the sort title for question......." likes="3434" level="Easy" />

		<Link to="admin">Admin</Link> */}
		</>
	)
}
export default Home;