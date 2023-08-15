function addSolution()
	{
		fetch("http://localhost:3007/api/v1/admin/solution/add", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			},
			body: JSON.stringify({question_id:data.question_id , language:data.language , code:data.code , title:data.title})
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					setMessage("add solution succesfully");
          
				} else {
					console.log(res);
					setMessage(res.message);
				}
			})
			.catch((e) => {
				console.log(e);
			})
	}

    export default addSolution;