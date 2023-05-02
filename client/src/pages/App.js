import '../App.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from './Hero/Hero';
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import cookie from "js-cookie";


const App = ()=>{
	const [data,setData] = useState({});
	const [isLoggedIn,setLogInStatus] = useState(false);
	useEffect(()=>{
		if(!cookie.get("token")){
			return;
		}
		fetch("http://localhost:3007/api/v1/home",{
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token":cookie.get("token")
			},
		}).then(res=>res.json())
		.then(res=>{
			if(res.status ==="ok"){
				setData(res.data);
				setLogInStatus(true);
			}
		})
		.catch(e=>console.log(e));
	},[])
	if(isLoggedIn){
		return (
			<>
				<Header isLoggedIn={isLoggedIn} name={data.name} setLogInStatus={setLogInStatus}/>
				<Outlet />
				<Footer />
			</>
		)
	}
	return (
		<>
			<Header isLoggedIn={isLoggedIn} name={data.name} setLogInStatus={setLogInStatus}/>
			<Hero />
			<Footer />
		</>
	)
}

export default App;
