import { useState } from "react";
import QuestionDatach from "../Hooks/useQuestionData";
import "../index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AllQuestion = () => {
  const navigate = useNavigate();

  const [dataforpop, setdatapop] = useState("");
  const [data1, setData1] = QuestionDatach();

  function checkNavigate(id) {
    if (!Cookies.get("userToken")) {
      navigate("login");
    } else {
      navigate("/user/question/" + id);
    }
  }
  console.log(dataforpop.number);

  function GetDataF() {
    return data1.map((program) => {
      return (
        <>
          {/* <div
            className="container mt-1 table-striped border mt-2"
            key={program._id}
            onClick={() => {
              checkNavigate(program._id);
            }}
          >
            <div className="row justify-content-start table-striped table-hover">
              <div className="col-sm-1  p-2">{program.number}</div>
              {program.level === "Easy" ? (
                <div className="col-sm-1 text-success p-2">{program.level}</div>
              ) : program.level === "hard" ? (
                <div className="col-sm-1 text-danger p-2">{program.level}</div>
              ) : (
                <div className="col-sm-1 text-warning p-2">{program.level}</div>
              )}
              <div className="col-sm-7 p-2">{program.question}</div>
              <div className="col-sm-3 p-2">{program.likes} Like</div>
            </div>
          </div> */}

          <tr onClick={()=>{checkNavigate(program._id)}}>
            <th>{program.number}</th>
            <td>{program.level}</td>
            {program.level === "Easy" ? (
              <td className="text-success">{program.level}</td>
            ) : program.level === "hard" ? (
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

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="col-sm-2">
              Number
            </th>
            <th scope="col" className="col-sm-2">
              Level
            </th>
            <th scope="col" className="col-sm-7">
              Question
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
