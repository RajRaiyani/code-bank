import QuestionDatach from "../Hooks/useQuestionData";
import "../index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AllQuestion=()=>{
	const navigate=useNavigate();
	const [data1, setData1]=QuestionDatach();
	function checkNavigate(props){
		if(!Cookies.get("userToken"))
		{
			navigate("login");
		}
		else
		{
			navigate("/user/question/"+props);
		}
	}
	
		


	function GetDataF() {
		return data1.map(program => {
			return (
				<tr key={program._id}onClick={()=>{checkNavigate(program._id)}} className="QuestionBox">
					
					<td className="py-3">{program.number}</td>
					{program.level === "esay"?(
						<td className="py-3 text-success">{program.level}</td>
					):(
						(program.level==="hard")?(
							<td className="py-3 text-danger">{program.level}</td>
						):(
							<td className="py-3 text-warning">{program.level}</td>
						)
						
					)}
					<td className="py-3">{program.question}</td>
					
				</tr>
			);
		})
	}
    return(
        <>
        <div className="container-sm">
				<table className="table table-light border text-center">
					<thead>
						<tr>
							<th>Program Number</th>
							<th>Program level</th>
							<th>Program Question</th>

						</tr>
					</thead>
					<tbody><GetDataF/></tbody>
					
				</table>
			</div>
        </>
    )
}
export default AllQuestion;