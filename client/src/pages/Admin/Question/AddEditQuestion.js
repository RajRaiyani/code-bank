import { useEffect, useState } from "react";
import "./../../../scss/form.scss";





const AddEditQuestion = (props) => {

	
	// useEffect(()=>{
	
	// },[])
	
	const formSchema = {
		number:"",
		title:"",
		question:"",
		level:""
	}

	const [formData,setFormData] = useState(formSchema);



	function handleInput(event){
		let name = event.target.name;
		let value = event.target.value;
		setFormData({...formData,[name]:value})
	}
	function formControl(name){
		return {name:name,onChange:handleInput,value:formData[name]}
	}

	function submitFormData(event){
		event.preventDefault();
		console.log(formData);
	}

	return (
		<div>
			{props.edit?<h1>Edit Question</h1>:<h1>Add Question</h1>}
			
			<form onSubmit={submitFormData} className="flex flex-col">

				<input type="number" {...formControl("number")} placeholder="Number"  />
				<input type="text" {...formControl("title")} placeholder="Title" />
				<input type="text" {...formControl("question")} placeholder="Question" />
				<select {...formControl("level")}>
					<option>Level</option>
					<option value="easy">Easy</option>
					<option value="medium">Midium</option>
					<option value="hard">Hard</option>
				</select>
				


				<input type="submit" />
			</form>
		</div>
	)
}

export default AddEditQuestion;