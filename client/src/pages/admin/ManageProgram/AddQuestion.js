import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function AddQuestion(props){

	var navigate = useNavigate();

	var [Message, setMessage] = useState("");
	var [data, setData] = useState({});
	var [categories, setCategories] = useState([]);
	var [languages, setLanguages] = useState([]);

	// fetching 2 lists "language","categories"
	// 1 -----------------
	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/list/get/catagory", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					let temp = [];
					res.data.list.forEach((e, i) => {
						temp.push({ id: i, value: e, isChecked: false });
					});
					setCategories(temp);
				} else {
					console.log(res);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}, [])
	// 2 ----------------
	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/list/get/language", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					setLanguages(res.data.list);
				} else {
					console.log(res);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}, [])

	// ======== maping components ==============
	function Categories() {
		return categories.map((e) => (
      <label
        key={e.id}
        style={{ paddingRight: "1rem" }}
        className="display_block"
      >
        <input
          type="checkbox"
          checked={e.isChecked}
          onChange={() => {
            handleChangeInCategories(e.id);
          }}
        />
        <span style={{ marginLeft: "0.5rem" }}>{e.value}</span>
      </label>
    ));
	}
	function Languages() {
		return languages.map(e => (
			<option key={e} value={e}>{e}</option>
		))
	}
	// ==========================================
	function handleChange(e) {
		setData({ ...data, [e.target.name]: e.target.value });
	}

	function handleChangeInCategories(id) {
		let updatedList = categories.map(e => {
			if (e.id === id) {
				return { ...e, isChecked: !e.isChecked };
			}
			return e;
		})
		setCategories(updatedList);
	}
	function submit(e) {
		e.preventDefault();
		let tempForCategories = categories.filter(e => e.isChecked).map(e => e.value);
    console.log({ number: data.number, question: data.question, categories: tempForCategories, level: data.level, solutions: [{ language: data.language, code: data.code }] })

		fetch("http://localhost:3007/api/v1/admin/question/add", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'token': Cookies.get("adminToken")
			},
			body: JSON.stringify({ number: data.number, question: data.question, categories: tempForCategories, level: data.level, solutions: [{ language: data.language, code: data.code }] })
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {

					if (window.confirm("add this program sucess")) {
						navigate("/admin/program")
					}
				}
        else if (res.status === "EXPIRED_TOKEN") {
          navigate("/login");
      }
       else {
					setMessage(res.message);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}
	return (
    <div className="overflow-auto w-100" style={{ height: "100vh" }}>
      {/* <form>
				<input type="number" name="number" placeholder="question number" onChange={handleChange} />
				<input type="text" name="question" placeholder="question" onChange={handleChange} /><br />
				<Categories />
				<br />
				<input type="radio" name="level" value="Hard" onChange={handleChange} /><span>Hard</span><br />
				<input type="radio" name="level" value="Easy" onChange={handleChange} /><span>Easy</span><br />
				<input type="radio" name="level" value="Medium" onChange={handleChange} /><span>Medium</span><br /><br />
				<hr />
				<select name="language" value={data.language} onChange={handleChange}>
					<Languages />
				</select><br />
				<input type="text" name="code" placeholder="<code>" onChange={handleChange} />
				<input type="submit" onClick={submit} />
			</form> */}
      <div className="container " style={{ marginTop: "2rem" }}>
        <h1>Add Question</h1>
        <h3 className="text-danger">{Message}</h3>
        <form className="mb-4">
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label" >
              Enter a Question number :
            </label>
            <input
              type="number"
              class="form-control"
              id="formGroupExampleInput"
              
              name="number" placeholder="question number" onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">
              Enter a Question :
            </label>
            <textarea
              rows={4}
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Enter a Question"
              name="question"  onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label class="form-label" style={{ display: "block" }}>
              Select Topic :
            </label>
          
            <Categories />
          </div>
          <div className="mb-3">
            <label class="form-label" style={{ display: "block" }}>
              Select level :
            </label>
            <div className="d-flex gap-2 display_block">
              <input
                type="radio"
                name="level"
                value="Hard"
                onChange={handleChange}
              />
              <span className="xs-ml-0">Hard</span>
              <br />
              <input
                type="radio"
                name="level"
                value="Easy"
                onChange={handleChange}
              />
              <span className="xs-ml-0">Easy</span>
              <br />
              <input
                type="radio"
                name="level"
                value="Medium"
                onChange={handleChange}
              />
              <span className="xs-ml-0">Medium</span>
            </div>
          </div>
          <div className="mb-3">
            <label class="form-label" style={{ display: "block" }}>
              Select Language :
            </label>
            <select
              name="language"
              value={data.language}
              onChange={handleChange}
            >
                <option disabled selected hidden>
              select language
            </option>
              <Languages />
            </select>
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">
              Enter a Solution :
            </label>
            <textarea
              rows={4}
              class="form-control"
              id="formGroupExampleInput"
              
              name="code" placeholder="<code>" onChange={handleChange}

            />
          </div>
          <button type="submit" class="btn btn-primary " onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;