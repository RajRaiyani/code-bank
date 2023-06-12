import AllQuestion from "../../utilities/AllQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import { useEffect  ,useState} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const Navigate=useNavigate();
  const [message, setMessage] = useState();
  const [arrayValues, setArrayValues] = useState([]);
  const [level,setlevel]=useState("");
  const [catagories , setCategories]=useState("");

  useEffect(() => {
    fetch("http://localhost:3007/api/v1/home/list/get/catagory", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("adminToken")
        }
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
                setArrayValues(res.data.list);
            }
            else if (res.status === "EXPIRED_TOKEN") {
                Navigate("/login");
            }
            else {
                setMessage(res.message);
            }
        })
        .catch(e => console.log("error : " + e));

}, [])
  function GetLevel() {
    return (
      <>
        <div className="dropdown">
          <select >
          <option disabled selected hidden>
              Level
            </option>
            <option className="text-danger" >
              none
              </option>
              <option className=" text-success" >
                Easy
              </option>
              <option className="text-warning" >
              Medium              </option>
              <option className="text-danger" >
              Hard
              </option>
              

          </select>
        </div>
      </>
    );
  }
  function GetCatagary() {
    return (
      <>
        <div className="dropdown">
          <select >
          <option disabled selected hidden>
              Categories
            </option>
            <option> none</option>
            {arrayValues.map((value,index)=>{
              return (
                <option>{value}</option>
              )
            })}
              

          </select>
        </div>
      </>
    );
  }
  function SearchBtn() {
    return (
      <>
        <div className="input-group">
          <div class="form-outline">
            <input
              type="search"
              id="form1"
              class="form-control"
              placeholder="Search"
            />
          </div>
          <button type="button" class="btn btn-primary">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className=" d-flex justify-content-between pb-2">
          <div className=" d-flex justify-content-start gap-2">
          <div > <GetLevel /></div>
            
            <GetCatagary />
          </div>
          <div>
            <SearchBtn />
          </div>
        </div>
      </div>
      <AllQuestion></AllQuestion>
    </>
  );
};

export default UserHome;
