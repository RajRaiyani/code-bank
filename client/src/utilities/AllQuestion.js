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
  const[level , setlevel]=useState("");
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
        <div style={{display:"flex" , justifyContent:"space-between"}}>

        
      <GetLevel level={level} setlevel={setlevel}/>
      <GetCatagary />
<SearchBtn data={data1} setData={setData1}> </SearchBtn>
</div>
        <div className="raw">
          <div className="col-md-8 main_box col-xs-12 col-sm-10" >
            <GetDataF />
          </div>
        </div>
      </div>
    </>
  );
};
export default AllQuestion;
