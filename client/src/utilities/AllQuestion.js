import { useState ,useEffect } from "react";
import QuestionDatach from "../Hooks/useQuestionData";
import "../index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AllQuestion  (props) {

  const navigate = useNavigate();
 

  const [dataforpop, setdatapop] = useState("");
  const [data1, setData1] = QuestionDatach();
  const [level,setlevel]=useState("");
  useEffect(() => {
  //   if(Cookies.get("adminToken"))
  //   {
  //     navigate("/admin")
  //   }
  //  else
    if (Cookies.get("userToken")) {
      navigate("/user/home");
    }
   
  }, [navigate]);

  function checkNavigate(id) {
    if (!Cookies.get("userToken")) {
      navigate("login");
    } else {
      navigate("/user/question/" + id);
    }
  }

  function GetLevel() {
    return (
      <>
        <div className="dropdown">
          <select value={level} onChange={(e)=>{setlevel(e.target.value)}}>
          <option disabled selected hidden>
              Level
            </option>
            <option className="text-danger" value="">
              none
              </option>
              <option className=" text-success" value="Easy" >
                Easy
              </option>
              <option className="text-warning"  value="Medium">
              Medium              </option>
              <option className="text-danger" value="Hard">
              Hard
              </option>
              

          </select>
        </div>
      </>
    );
  }
  var filterdata = props.level ? data1.filter((e) => e.level === props.level) : data1;
  // const filterdata1=props.catagories ? filterdata.filter((e)=>)


  function GetDataF() {

    return filterdata.map((program) => {
      return (
        <>
          <tr
            key={program._id}
            onClick={() => {
              checkNavigate(program._id);
            }}
          >
            <th>{program.number}</th>

            <td>{program.question}</td>
            {program.level === "Easy" ? (
              <td className="text-success">{program.level}</td>
            ) : program.level === "Hard" ? (
              <td className="text-danger">{program.level}</td>
            ) : (
              <td className="text-warning ">{program.level}</td>
            )}
            <td>{program.likes} Like</td>
          </tr>

          {/* <tr
            key={program._id}
            onClick={() => {
              checkNavigate(program._id);
            }}
            className="QuestionBox"
          >
            <td className="py-3">{program.number}</td>
            {program.level === "esay" ? (
              <td className="py-3 text-success">{program.level}</td>
            ) : program.level === "hard" ? (
              <td className="py-3 text-danger">{program.level}</td>
            ) : (
              <td className="py-3 text-warning">{program.level}</td>
            )}
            <td className="py-3">{program.question}</td>
          </tr> */}
        </>
      );
    });
  }


  
  // ============================
  return (
    <>
      {/* <div className="container border mt-2">
        <div className="row justify-content-start">
          <div className="col-sm-1 p-2">Number</div>
          <div className="col-sm-1 p-2">Level</div>
          <div className="col-sm-7 p-2">Question</div>
          <div className="col-sm-3 p-2">Like</div>
        </div>
        
      </div> */}
      <div className="container">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" className="col-sm-1">
                Number
              </th>

              <th scope="col" className="col-sm-9">
                Question
              </th>
              <th scope="col" className="col-sm-1">
                Level
              </th>
              <th scope="col" className="col-sm-2">
                Like
              </th>
            </tr>
          </thead>
          <tbody>
            <GetDataF />
          </tbody>
        </table>
      </div>

      {/* <div className="container-sm">
        <table className="table table-light border text-center">
          <thead>
            <tr>
              <th>Program Number</th>
              <th>Program level</th>
              <th>Program Question</th>
            </tr>
          </thead>
          <tbody>
            <GetDataF />
          </tbody>
        </table>
      </div> */}
    </>
  );
};
export default AllQuestion;
