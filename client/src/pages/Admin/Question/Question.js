

import { Link, useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import { QuestionCard } from "../../../components/Cards/QuestionCard";
import useGetAllQuestions from "../../../hooks/useGetAllQuestions";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
import deleteQuestionById from "../../../utilities/APIcalls/deleteQuestion";
import searchQuestion from "../../../utilities/APIcalls/searchButton";



const LevelFillter = (arg) => {

	return (
		<>
			<select className="border gc-border-green ms-12 mt-4  rounded-md text-lg" onChange={(e) => { arg.setlevel(e.target.value) }} >
				<option value="">Level</option>
				<option value="Easy" >Easy</option>
				<option value="Medium">Medium</option>
				<option value="Hard">Hard</option>
			</select>		</>
	)
}
const CategoryFillter = (arg) => {
	const [Allcatagoies] = useGetAllCategories();

	return (
		<>
			<select className="border gc-border-green ms-4 mt-4 rounded-md text-lg" onChange={(e) => { arg.setcategory(e.target.value) }} >
				<option value="">Categories</option>
				{Allcatagoies.map((data, index) => {
					return (
						<option key={index} value={data}>{data}</option>
					)
				})}
			</select>
		</>
	)
}
const Home = () => {
	const [getAllData, setData] = useGetAllQuestions();
	const [level, setlevel] = useState("");
	const [category, setcategory] = useState("");
	const navigate = useNavigate();
	const [searchdata,setsearchdata]=useState("");

	function deleteQuestion(e, id, callback) {
		e.preventDefault();
		const confirm = window.confirm("Are you sure you want to delete this question?");
		if (confirm) 
{
		deleteQuestionById(id, callback);
		setData(getAllData.filter((e) => e._id !== id));
}
	}
	const [fitterdata , setfillter]=useState([]);

	useEffect(()=>{

		setfillter(getAllData)
	if (level !== "" && category !== "") {
		 setfillter([...getAllData.filter((e) => e.level === level && e.categories.includes(category))])
	}
	else if (level !== "") {
		setfillter([...getAllData.filter((e) => e.level === level)] )

	}
	else if (category!==""){
		setfillter([...getAllData.filter((e) => e.categories.includes(category)) ])

	}},[level,category,getAllData])

	var printdata
	if(fitterdata!==undefined)
	{

	 printdata = fitterdata.map((data, index) => {
		return (
			<Link to={`/admin/Question/${data._id}`} key={index}>
				<QuestionCard className="my-3 gc-shadow-23" onEdit={(e)=>{e.preventDefault();
	navigate(`/admin/question/${data._id}/edit`);}} onDelete={(e) => { deleteQuestion(e, data._id, () => { navigate("/login") }) }}  number={data.number} admin={true} title={data.title} likes={data.likes} level={data.level} />
			</Link>
		);
	})
}
function handeldata(e)
	{
		setsearchdata(e.target.value)
		if(e.target.value==="")
		{
			setfillter([...getAllData]);
		}
		
	}
	async function searchData()
	{
		await searchQuestion(searchdata,setfillter,()=>{navigate("/login")})
	}
	return (
		<>
		<div className="flex justify-between items-center w-3/4">
				<div>
					<LevelFillter setlevel={setlevel} />
					<CategoryFillter setcategory={setcategory} />
				</div>
				<div className="h-[100%] pt-2 ">
					<div className="flex  justify-end h-[50px] items-center border gc-border-green rounded gap-2  gc-shadow-25"  >
						<input type="text" className="border-0 outline-none h-[70%]  focus:outline-none rounded  pl-2 bg-inherit" placeholder="" onChange={(e)=>handeldata(e)} />
						<div onClick={()=>{searchData()}}> onbutton</div>
					</div>
				</div>
			</div>
			
			<Link to="/admin/question/add" className="m-2 hover:text-green-800 border-4 p-2 rounded ">+ Add</Link>

			<div className="w-[95%]  mx-4 my-2 p-3 gc-shadow-25 rounded ">
				{printdata}
			</div>
		</>
	)
}
export default Home;