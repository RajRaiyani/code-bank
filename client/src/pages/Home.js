import { Link } from "react-router-dom";
import { QuestionCard } from "../components/Cards/QuestionCard";
import QuestionCount from "../components/Cards/QuestionCount";
import useGetAllQuestions from "../hooks/useGetAllQuestions";
import { useState } from "react";
import useGetAllCategories from "../hooks/useGetAllCategories";

// const serachSdow = {
// 	boxShadow: "3px 3px 6px 0px #BEDBC8 inset",

// 	boxShadow: " -3px -3px 6px 1px #FFFFFF80 inset"

// }
const LevelFillter = (arg) => {
	return (
		<>
			<select className="border gc-border-green ms-12 mt-4 rounded-md text-lg" onChange={(e) => { arg.setlevel(e.target.value) }} >
				<option value="">Level</option>
				<option value="easy" >Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
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
	const [getAllData] = useGetAllQuestions();
	const [level, setlevel] = useState("");
	const [category, setcategory] = useState("");
	const Easy = getAllData.filter((e) => e.level === "easy");
	const Medium = getAllData.filter((e) => e.level === "medium");
	const Hard = getAllData.filter((e) => e.level === "hard");
	if (level !== "" && category !== "") {
		var filterdata = level && category ? getAllData.filter((e) => e.level === level && e.categories.includes(category)) : getAllData;
	}
	else if (level !== "") {
		filterdata = level ? getAllData.filter((e) => e.level === level) : getAllData;

	}
	else {
		filterdata = category ? getAllData.filter((e) => e.categories.includes(category)) : getAllData;
	}

	const printdata = filterdata.map((data, index) => {
		return (
			<Link to={`/question/${data._id}`} key={index}>
				<QuestionCard className="my-3 gc-shadow-23" number={data.number} title={data.title} likes={data.likes} level={data.level} />
			</Link>
		);
	})
	return (
		<>
			<div className="flex justify-between items-center w-3/4">
				<div>
					<LevelFillter setlevel={setlevel} />
					<CategoryFillter setcategory={setcategory} />
				</div>
				<div className="h-[100%] pt-2 ">
					<div className="flex  justify-end h-[50px] items-center border gc-border-green rounded gap-2  gc-shadow-25"  >
						<input type="text" className="border-0 outline-none h-[70%]  focus:outline-none rounded  pl-2 bg-inherit" placeholder="" />
						<div>button</div>
					</div>
				</div>
			</div>


			<div className="flex ">

				<div className="w-3/4  mx-4 my-2 p-3 gc-shadow-25 rounded mt-4">
					{printdata}
				</div>
				<QuestionCount className="m-4" count={getAllData.length} Easy={Easy.length} Medium={Medium.length} Hard={Hard.length} />
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