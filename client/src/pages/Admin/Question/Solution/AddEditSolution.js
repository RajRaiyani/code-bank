

const AddEditSolution = (props) => {
	
	return (
		<div>
			<h1>Add and Edit Solution Page</h1>
			<h1>{props.edit?"true":"false"}</h1>


			<div className="container " style={{ marginTop: "2rem" }}>
          <h1>Add solution</h1>
          <h3 className="text-danger">{message}</h3>
		  <label for="language" className="form-label"> Select Languages :</label>
          <select
			className="form-select mb-3"
            name="language"
            id="language"
            value={data.language}
            onChange={handleChange}
          >
            <option disabled selected hidden>
              select language
            </option>
            <Languages />
          </select>
		  <label for="formGroupExampleInput" className="form-label">
              Enter a Tile :
            </label>
              <input
			  	rows={4}
                className="form-control mb-3"
                type="text"
          name="title"
          placeholder="brute force approach"
          onChange={handleChange}
              />
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Enter a Solution :
            </label>
          
              <textarea
			  	rows={4}
                className="form-control mb-3"
                id="formGroupExampleInput"
                type="text"
          name="code"
          placeholder="<code>"
          onChange={handleChange}
              />
              <button className="btn btn-primary" onClick={submit}>
                Add Solution
              </button>
          </div>
        </div>
		</div>
	)
}

export default AddEditSolution;