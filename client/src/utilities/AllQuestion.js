import { useState, useEffect } from "react";
import QuestionDatach from "../Hooks/useQuestionData";
import "../index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../css/components.css"
import LikeButton from "./likebutton";
import GetLevel from "../components/GetLevel";
import GetCatagary from "../components/GetCategory";
import SearchBtn from "../components/Search";

function AllQuestion(props) {
  const navigate = useNavigate();
  const [data1, setData1] = QuestionDatach();
  const [level, setlevel] = useState("");
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

  var filterdata = level ? data1.filter((e) => e.level === level) : data1;
  function GetDataF() {

    return filterdata.map((program) => {
      return (
        <>
          <div
            className="Question_box"
            key={program._id}
            onClick={() => {
              checkNavigate(program._id);
            }}
          >
            <div style={{ padding: "0.5rem" }}>
              <span style={{ flex: "1", float: 'left', paddingRight: "0.5rem" }}> <b>{program.number}</b></span>
              <div style={{}}> {program.title}
                <span style={{ float: "right", }}>
                  <LikeButton status={program} nolike={program.likes}></LikeButton>
                </span></div>
              {program.level === "Easy" ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
#7CC529" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                  <span style={{ paddingLeft: "0.5rem" }}>{program.level}</span>
                </>
              ) : program.level === "Hard" ? (<>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
                #E47171" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg>
                <span style={{ paddingLeft: "0.5rem" }}>{program.level}</span>
              </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
                #FFB444" class="bi bi-circle-fill" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                  <span style={{ paddingLeft: "0.5rem" }}>{program.level}</span>
                </>
              )}

            </div>
          </div>
        </>
      );
    });
  }
  return (
    <>
      <div className="Container">
        <div className="row flex-sm-row">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <GetLevel level={level} setlevel={setlevel} />
              <GetCatagary />
            </div>
            <SearchBtn data={data1} setData={setData1}> </SearchBtn>
          </div>
          <div className="col-md-8 main_box col-sm-10" >
            <GetDataF />
          </div>
          <div className="col-md-4 col-xs-12 col-sm-2 d-flex display-none " >
            <div className="ml-5 mb-5 mt-0 flex-column align-items-center justify-content-center rounded-circle circle mb-3 mb-sm-0 custom-circle" >
              <span className="number" style={{ fontSize: "4rem", color: "#503524" }}>42</span>
            </div>
            <div className="label-container mt-4" style={{ fontSize: "1.2rem", marginLeft: "1rem" }}>
              <span style={{ marginLeft: "-0.5rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
                #7CC529" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg>&nbsp;&nbsp;Eassy<br />
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
                #FFB444" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg>&nbsp;&nbsp;Medium
              </span ><br />
              <span style={{ marginLeft: "-0.3rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
                #E47171" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg>&nbsp;&nbsp;Hard
              </span><br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllQuestion;
