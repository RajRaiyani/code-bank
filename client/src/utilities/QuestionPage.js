import { useEffect ,useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const Question=()=>{
    const { id } = useParams();
    const [getdata, setGetdata] = useState([]);

   
	useEffect(() => {
		fetch("http://localhost:3007/api/v1/home/question/"+id, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("token")
			}
		}).then(res => res.json())
			.then(res => {
				console.log(res)
				if (res.status === "OK") {
                    setGetdata(res.data);
				}
			})
			.catch(e => console.log("error : " + e));

	},[id]);

    
    
    return(
        <h1>
            this is question {id}
            <br></br>
            {getdata.number}<br/>  
            {getdata.question}    
        </h1>
    )
}

export default Question;