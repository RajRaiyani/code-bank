import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import QuestionDatach from "../Hooks/useQuestionData";
import Cookies from "js-cookie";
import { useEffect } from "react";

function SearchBtn(props) {
    const [data1, setData1] = QuestionDatach();
    const handleInputChange = (event) => {
       if(event.target.value=="")
       {
        props.setData(data1);
       }
       else{
       
            fetch("http://localhost:3007/api/v1/home/question", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "token": Cookies.get("userToken")
                },
                body:JSON.stringify({ filter:{searchstring:event.target.value}})
            }).then(res => res.json())
                .then(res => {
                    if (res.status === "OK") {
                        props.setData(res.data);
                    }
                    else{
                        console.log(res);
                    }
                })
                .catch(e => console.log("error : " + e));
        }
       }
      
    return (
      <>
        <div className="input-group">
          <div >
            <input
              type="search"
              id="form1"
              class="form-control"
              placeholder="Search"
              onChange={handleInputChange}
            />
          </div>
          <button type="button" class="btn btn-primary">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </>
    );
  }
  export default SearchBtn;