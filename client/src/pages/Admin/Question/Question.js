

import { Link  , useNavigate} from "react-router-dom";
import { useState } from "react";
import { QuestionCard } from "../../../components/Cards/QuestionCard";
import useGetAllQuestions from "../../../hooks/useGetAllQuestions";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
import deleteQuestionById from "../../../utilities/APIcalls/deleteQuestion";
function editQuestion(e,id){
	e.preventDefault();
console.log("edit")
}


const LevelFillter = (arg) => {	

	return (
		<>
		<select className="border gc-border-green ms-12 mt-4  rounded-md text-lg" onChange={(e)=>{arg.setlevel(e.target.value)}} >
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
		<select className="border gc-border-green ms-4 mt-4 rounded-md text-lg" onChange={(e)=>{arg.setcategory(e.target.value)}} >
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
	const [getAllData ,setData] = useGetAllQuestions();
	const [level, setlevel] = useState("");
	const [category, setcategory] = useState("");
	const navigate=useNavigate();

	function deleteQuestion(e,id,callback){
		e.preventDefault();
		console.log(id, callback)
		deleteQuestionById(id,callback);
		setData(getAllData.filter((e)=>e._id!==id));
	}

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
			<Link to={`/admin/Question/${data._id}`} key={index}>
			<QuestionCard className="my-3 gc-shadow-23" onEdit={editQuestion} onDelete={(e)=>{deleteQuestion(e,data._id , ()=>{navigate("/login")})}} number={data.number} admin={true}  title={data.title} likes={data.likes} level={data.level} />
			</Link>
	);
	})
	return(
		<>
			<LevelFillter setlevel={setlevel}/>
		<CategoryFillter setcategory={setcategory}/>

		<div className="w-[95%]  mx-4 my-2 p-3 gc-shadow-25 rounded ">
		{printdata}
		</div>
		</>
	)
}
export default Home;