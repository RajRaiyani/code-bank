import { useState } from "react";





const AddEditQuestion = (props) => {
	
	const formSchema = {
		number:undefined,
		title:"",
		question:"",
		categories:[],
		level:undefined

	}

	const [formData,setFormData] = useState(formSchema);

	function handleInput(event){
		
	}

	function submitFormData(event){

	}

	return (
		<div>
			{props.edit?<h1>Edit Question</h1>:<h1>Add Question</h1>}
			
			<form onSubmit={submitFormData} className="flex flex-col">

				<input type="number" onChange={handleInput} placeholder="Number" />
				<input type="text" onChange={handleInput} placeholder="Title" />
				<input type="text" onChange={handleInput} placeholder="Question" />
				
			</form>
		</div>
	)
}

export default AddEditQuestion;