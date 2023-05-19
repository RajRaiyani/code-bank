import Cookies from "js-cookie";
import { useEffect, useState } from "react";



const AddQuestion = () => {


	var [data, setData] = useState({});
	var [categories, setCategories] = useState([]);
	var [languages, setLanguages] = useState([]);


	// fetching 2 lists "language","categories"
	// 1 -----------------
	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/list/get/categories", {
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
		return categories.map(e => (
			<label key={e.id}>
				<input type="checkbox" checked={e.isChecked} onChange={() => { handleChangeInCategories(e.id) }} />{e.value}
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
		let tempForCategories = categories.filter(e=>e.isChecked).map(e=>e.value);
		fetch("http://localhost:3007/api/v1/admin/question/add", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'token':Cookies.get("adminToken")
			},
			body: JSON.stringify({number:data.number,question:data.question,categories:tempForCategories,level:data.level,solutions:[{language:data.language,code:data.code}]})
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					window.alert("done");
				}else{
					console.log(res);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}

	return (
		<>
			<form>
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

			</form>
		</>
	);
}

export default AddQuestion;