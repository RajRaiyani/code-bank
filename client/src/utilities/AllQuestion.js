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

  var filterdata = props.level ? data1.filter((e) => e.level === props.level) : data1;
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
        </>
      );
    });
  }


  
  // ============================
  return (
    <>
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
    </>
  );
};
export default AllQuestion;
