import { useEffect ,useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const QuestionByID=()=>{
    const { id } = useParams();
    const [getdata, setGetdata] = useState([]);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();


   
	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/question/"+id, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
					setGetdata(res.data);
				}
				else if (res.status === "EXPIRED_TOKEN") {
					navigate("/login");
				}
				else {
					setMessage(res.message)
					console.log(res);
				}
			})
			.catch(e => console.log("error : " + e));

	},[id]);

    
    
    return(
        <>
			<div>
				<div className='ps-2'>
					<button type="button" className="btn btn-outline-secondary">Description</button></div>
				<div className="text-danger">{message}</div>

				<div className='p-2 '><b>{getdata.number} Question Name</b></div>
				<div className='ps-2 pt-1'>
					{getdata.level === "esay" ? (
						<span className="py-3 text-success">{getdata.level}</span>
					) : (
						(getdata.level === "hard") ? (
							<span className="py-3 text-danger">{getdata.level}</span>
						) : (
							<span className="py-3 text-warning">{getdata.level}</span>
						)

					)}

					<span className='ps-5'>
						<FontAwesomeIcon icon={faHeart} /> ,
						<span className='text-secondary'> Likes count </span>
						<span className='text-secondary ps-5'> <FontAwesomeIcon icon={faShare} />share button</span>
						</span>
					<hr style={{ width: '70%' }}></hr>
					<div className='pt-2'><b>Question</b> :{getdata.question}</div>

				</div>


			</div>
		</>
	)
						}

export default QuestionByID;