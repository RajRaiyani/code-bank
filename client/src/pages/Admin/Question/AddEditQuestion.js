import { useState } from "react";


import useGetAllCategories from "../../../hooks/useGetAllCategories";

import { useForm } from "react-hook-form";
import useGetQuestionDataById from "../../../hooks/useGetQuestionByID";
import { useParams } from "react-router-dom";
import useGetAllLanguages from "../../../hooks/useGetAllLanguages";





const AddEditQuestion = (props) => {

	const [solutionCount, setSolutionCount] = useState(1);
	const params = useParams();
	const [allCategories] = useGetAllCategories();
	const [languages] = useGetAllLanguages();
	const [questionData] =  useGetQuestionDataById(params.id,!props.edit);

	var {number,title,question,level,categories} = questionData;

	var values={number,title,question,level,categories};
	
	
	const { register, handleSubmit } = useForm({values});


	function submitForm(data) {
		console.log(data);
	}


	function Categories() {
		return allCategories.map((val, index) => (
			<span key={index}>
				<label>{val}</label>
				<input type="checkbox" {...register("categories")} value={val} />
			</span>
		));
	}
	
	function SelectLanguage(props){
		return(
			<select {...register(props.name)}>
				<option>Language</option>
				{languages.map((lng,index)=><option key={index} value={lng}>{lng}</option>) }
			</select>
		)
	}

	function SolutionForm() {
		let arr = []
		for (let i = 0; i < solutionCount; i++) {
			arr.push((
				<span key={i}>
					<input type="text" {...register("solutions."+i+".title")} placeholder="title" />
					<SelectLanguage name={"solutions."+i+".language"} />
					<input type="text" {...register("solutions."+i+".code")} placeholder="code" />
				</span>
			))
		}
		return arr;
	}



	return (
		<div>
			{props.edit ? <h1>Edit Question</h1> : <h1>Add Question</h1>}
			<button className="border-4" onClick={() => setSolutionCount(p =>p+1)}>add Solution</button>

			<form onSubmit={handleSubmit(submitForm)} className="flex flex-col">

				<input type="number" {...register("number")} placeholder="Number" />
				<input type="text" {...register("title")} placeholder="Title" />
				<input type="text" {...register("question")} placeholder="Question" />
				<select {...register("level")}>
					<option>Level</option>
					<option value="easy">Easy</option>
					<option value="medium">Midium</option>
					<option value="hard">Hard</option>
				</select>
				<Categories />
				{!props.edit && <SolutionForm />}
				
				<input type="submit" />
			</form>
		</div>
	)
}

export default AddEditQuestion;