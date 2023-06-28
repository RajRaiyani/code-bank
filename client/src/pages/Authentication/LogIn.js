import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cookie from "js-cookie";

const LogIn = (props) => {
	console.log("hit login");

	const [data, setData] = useState({ email: "", password: "" });
	const [message, setMessage] = useState("");
	var navigate = useNavigate();

	function handleData(e) {
		var name = e.target.name;
		var value = e.target.value;
		setData({ ...data, [name]: value });
	}

	function sendData(e) {
		e.preventDefault();
		fetch("http://localhost:3007/api/v1/authentication/LogIn", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					
					if(res.role==="user")
					{
					
						cookie.set("userToken",res.token,{
							expires: new Date().getTime() + 2 * 1000*3600,
						  });
						cookie.set("username",res.username,{
							expires: new Date().getTime() + 2 * 1000*3600,
						  });
						navigate("/user/home");
					}
					if(res.role==="admin"){
						cookie.set("username","admin",{
							expires: new Date().getTime() + 2 * 1000*3600,
						  });
						cookie.set("adminToken",res.token,{
							expires: new Date().getTime() + 2 * 1000*3600,
						  });
						  cookie.set("userToken",res.token,{
							expires: new Date().getTime() + 2 * 1000*3600,
						  });
						navigate("/admin");
					}
					}
					setMessage(res.message)

			})
			.catch((e) => {
				console.log(e);
			})

		

	}

	return (
		<>
			<Link to="/" className="my-link my-hover-green fs-1 m-3">&larr;</Link>
			<div className="container-sm bg-light border border-secondary rounded position-absolute top-50 start-50 translate-middle">
				<div className="text-center fs-3">Log in</div>
				<div className="text-danger">{message}</div>
				<form>
					<label className="form-label">Email</label>
					<input className="form-control" placeholder="Email" type="email" name="email"
						onChange={handleData}></input>

					<label className="form-label">Password</label>
					<input className="form-control" placeholder="Password" type="password" name="password"
						onChange={handleData}></input>
					

					<div className="d-flex p-2 justify-content-between align-items-center">
						<button className="btn btn-primary m-2"
							onClick={sendData}>Log in</button>
						<Link to="/signin">don't have an account?</Link>
					</div>
				</form>
			</div>
		</>
	);
}

export default LogIn;