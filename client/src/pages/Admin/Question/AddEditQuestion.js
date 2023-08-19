import { useState } from "react";
import { useParams } from "react-router-dom";




import { useForm } from "react-hook-form";

import useGetAllCategories from "../../../hooks/useGetAllCategories";
import useGetAllLanguages from "../../../hooks/useGetAllLanguages";

import useGetQuestionDataById from "../../../hooks/useGetQuestionByID";





const AddEditQuestion = (props) => {

	const [solutionCount, setSolutionCount] = useState(1);
	const params = useParams();
	const [allCategories] = useGetAllCategories();
	const [languages] = useGetAllLanguages();
	const [questionData] = useGetQuestionDataById(params.id, !props.edit);

	var { number, title, question, level, categories } = questionData;
	var values = { number, title, question, level, categories };

	const { register, handleSubmit } = useForm({ values });


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

	function SelectLanguage(props) {
		return (
			<select {...register(props.name)}>
				<option>Language</option>
				{languages.map((lng, index) => <option key={index} value={lng}>{lng}</option>)}
			</select>
		)
	}

	function SolutionForm() {
		let arr = []
		for (let i = 0; i < solutionCount; i++) {
			arr.push((
				<div className="flex flex-col border p-2 rounded-md" key={i}>
					<input type="text" {...register("solutions." + i + ".title")} placeholder="title" />
					<SelectLanguage name={"solutions." + i + ".language"} />
					<textarea rows={10} {...register("solutions." + i + ".code")} placeholder="code"></textarea>
				</div>
			))
		}
		return arr;
	}



	return (
		<div>
			<h1 className="text-3xl text-center">{props.edit ? "Edit Question" : "Add Question"}</h1>


			<div className="flex justify-center">

				<div className="w-1/2">
					<form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
						<div className="flex justify-between">
							<input className="" type="number" {...register("number")} placeholder="Number" />
							<select {...register("level")}>
								<option>Level</option>
								<option value="easy">Easy</option>
								<option value="medium">Midium</option>
								<option value="hard">Hard</option>
							</select>
						</div>




						<input type="text" {...register("title")} placeholder="Title" />
						<textarea {...register("question")} rows={5} placeholder="Question"></textarea>

						<div className="flex justify-between">
							<div className="flex flex-col p-2 w-1/4">
								<Categories />
							</div>
							<div className="flex flex-col w-full">
							<button className="w-fit ms-auto m-2 p-2 gc-border-green gc-hover-bg-green border rounded" onClick={() => setSolutionCount(p => p + 1)}>Add Solution</button>
								{!props.edit && <SolutionForm />}
							</div>
						</div>


						<input type="submit" />
					</form>

				</div>

			</div>


		</div>
	)
}

export default AddEditQuestion;