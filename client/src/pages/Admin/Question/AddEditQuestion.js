

const AddEditQuestion = (props) => {
	
	return (
		<div>
			<h1>Add and Edit Question Page</h1>
			<h1>{props.edit?"true":"false"}</h1>
		</div>
	)
}

export default AddEditQuestion;