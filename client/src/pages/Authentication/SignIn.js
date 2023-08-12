import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {

	const [message, setMessage] = useState("");

	return (
		<>
			<div className="static">
				<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 login-sign-box">
					<div className="flex justify-center pb-2 pt-6">
						<img src="/assets/images/GreenCode_Logo_main.png" width={200} alt="logo of gree-bank"></img>
					</div>
					<h3 className="text-center font-bold gc-text-black text-xl pb-2">Sign In</h3>
					<form>
						<div className="text-red-700 text-center ">{message}</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="username">
								Username :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" pattern="^[a-zA-Z\s]{3,}$"
								title="Please enter a valid name"
								required />
						</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="email">
								Email :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="email" type="text" placeholder="Email" 
								pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
								title="Please enter a valid Email address"
								required />
						</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="password">
								Password :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="password" type="password" placeholder="Password" 
								pattern="^(?!\s)[^\s]{8,}$"
								title="Password must be atleast 8 characters long"
								required />
						</div>
						<div className="px-4 mb-4">
							<label className="block gc-text-black text-sm font-bold mb-0" for="cpassword">
								Password :
							</label>
							<input className="appearance-none gc-border-black border rounded w-full py-2 px-4 gc-color-black leading-tight focus:outline-none " id="cpassword" type="password" placeholder="Cpassword"
								pattern="^(?!\s)[^\s]{8,}$"
								title="Password must be atleast 8 characters long"
								required />
						</div>
						<div>
							<div
								className="flex justify-start px-4 text-sm pb-4 gc-color-black"
								style={{ opacity: "0.4" }}
							>
								*Name containes minimum 3 characters
								<br />
								*Password must be atleast 8 characters long
							</div>
						</div>
						<div className="px-4 pb-2">
							<input type="submit" className="border gc-border-green rounded w-full pt-1 pb-1 font-bold gc-bg-green" style={{color:"white"}}/>
						</div>
						<div className="pb-3">
							<span className="pl-4" style={{ opacity: "0.4" }} >Allready have account ?</span>
							<Link to="/LogIn" className="ml-2 gc-text-green underline decoration-wavy decoration-auto gc-hover-text-black">
								LogIn
							</Link>
						</div>
					</form>
				</div>
			</div>

		</>
	);
}

export default SignIn;