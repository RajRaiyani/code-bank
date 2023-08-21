

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { QuestionCard } from "../../../components/Cards/QuestionCard";
import useGetAllQuestions from "../../../hooks/useGetAllQuestions";
import useGetAllCategories from "../../../hooks/useGetAllCategories";
import deleteQuestionById from "../../../utilities/APIcalls/deleteQuestion";
import searchQuestion from "../../../utilities/APIcalls/searchQuestion";
import { FiSearch } from "react-icons/fi";
import { SiAddthis } from "react-icons/si";




const Home = () => {
	const [allQuestions,setAllQuestion] = useGetAllQuestions();
	const [Allcatagoies] = useGetAllCategories();

	const [level, setLevel] = useState("");
	const [category, setCategory] = useState("");

	const [searchString, setSearchString] = useState("");

	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [displayQuestion, setDisplayQuestion] = useState([]);

	const navigate = useNavigate();

	async function deleteQuestion(id, callback) {
		const confirm = window.confirm("Are you sure you want to delete this question?");
		if (confirm) {
			await deleteQuestionById(id, callback);
			setAllQuestion(allQuestions.filter((e) => e._id !== id));
		}
	}

	useEffect(() => {

		setDisplayQuestion(allQuestions)
		setFilteredQuestions(allQuestions)

	}, [allQuestions])


	useEffect(() => {

		let temp = filteredQuestions;
		if (level !== "") temp = filteredQuestions.filter((e) => e.level === level);
		if (category !== "") temp = temp.filter((e) => e.categories.includes(category));
		setDisplayQuestion([...temp]);

	}, [level, category, filteredQuestions])


	function handeldata(e) {
		setSearchString(e.target.value)
		if (e.target.value === "") setFilteredQuestions([...allQuestions]);
	}

	async function searchData() {
		await searchQuestion(searchString, setFilteredQuestions, () => { navigate("/login") })
	}


	return (
		<div className="w-[100%] p-5">

				<div className="flex justify-between items-center">

					<div className="flex justify-around md:justify-start">
						<select className="border me-2 my-2  text-lg gc-border-green rounded-md" onChange={(e) => { setLevel(e.target.value) }} >
							<option value="">Level</option>
							<option value="easy" >Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>

						<select className="border ms-2 my-2 text-lg gc-border-green rounded-md" onChange={(e) => { setCategory(e.target.value) }} >
							<option value="">Categories</option>
							{Allcatagoies.map((data, index) => <option key={index} value={data}>{data}</option>)}
						</select>
					</div>

					<div className="flex p-1 max-w-sm justify-between border gc-border-green items-center rounded gc-shadow-62"  >
						<input type="text" placeholder="Search..." className="outline-none border-none w-full h-[100%] px-1 text-sm focus:outline-none rounded bg-inherit" onChange={(e) => handeldata(e)} />
						<button className="gc-bg-green p-1 rounded-md h-full hover:scale-90 duration-200"><FiSearch className="text-lg text-white font-extrabold" onClick={() => { searchData() }} /></button>
					</div>

					<SiAddthis className="gc-text-green text-3xl hover:scale-110" onClick={()=>navigate("/admin/question/add")} />
					

				</div>

				<div className="p-3 gc-shadow-25 rounded mt-4">
					{displayQuestion.map((data, index) =>

							<QuestionCard key={index} admin className="my-3 gc-shadow-23 w-full mx-auto" 
							onEdit={() =>navigate(`/admin/question/${data._id}/edit`)} 
							onClick={()=>navigate(`/admin/Question/${data._id}`)} 
							onDelete={() =>{deleteQuestion(data._id, () => navigate("/login"))}} number={data.number} title={data.title} likes={data.likes} level={data.level} />

					)}
				</div>

			</div>
	)
}
export default Home;