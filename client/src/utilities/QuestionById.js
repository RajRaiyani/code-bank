import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../App.css";
const QuestionByID = () => {
  const { id } = useParams();
  const [getdata, setGetdata] = useState([]);
  const [message, setMessage] = useState("");
  const [isComments, setIsComments] = useState(false);
  const [getLanguage, setLanguage] = useState("javascript");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3007/api/v1/home/question/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("userToken"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "OK") {
          setGetdata(res.data);
        } else if (res.status === "EXPIRED_TOKEN") {
          console.log("hii");
          navigate("/login");
        } else {
          setMessage(res.message);
          console.log(res);
        }
      })
      .catch((e) => console.log("error : " + e));
  }, [id]);

  const codeString = `
  	num += 1
   	e.stopPropagation();
    console.log("sub");
	console.log("main");
  `;

  function SelectLanguage() {
    return (
      <>
        <select
          className="form-select"
          value={getLanguage}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="java">java</option>
          <option value="python">python</option>
          <option value="javascript">javascript</option>
        </select>
      </>
    );
  }

  function GetComment() {
    return (
      <>
        <div className="d-flex flex-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="/images/profile.png"
            alt="avatar"
            width="40"
            height="40"
          />
          <div className="form-outline  w-100 mb-2">
            <textarea
              className="form-control"
              id="textAreaExample"
              rows="4"
              style={{ backgroundColor: "#fff" }}
              placeholder="Message"
            ></textarea>
          </div>
        </div>
        <div className="d-flex gap-2  justify-content-end w-100">
          <button type="button" className="btn btn-primary btn-sm">
            Post comment
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm">
            Cancel
          </button>
        </div>

        <div className="d-flex flex-start align-items-center">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="/images/profile.png"
            alt="avatar"
            width="40"
            height="40"
          />
          <div>
            <h6 className="fw-bold text-primary mb-1">
              Utasv Raj Harshil Savan
            </h6>
            <p className="text-muted small mb-0">Top Growth - Jul 2022</p>
          </div>
        </div>

        <p className="mt-3 mb-2 pb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip consequat.
        </p>
      </>
    );
  }

  function GetQuestionData() {
    return (
      <>
        {/* Here is short problem statement  */}
        <div>
          <h4>
            <b className="lead-font-size">{getdata.number} Question Name</b>
          </h4>
        </div>

        {/* Here is question level and like of that particular question */}
        <div className="d-flex justify-content-between">
          <div>
            {getdata.level === "esay" ? (
              <h5 className="text-success">{getdata.level}</h5>
            ) : getdata.level === "hard" ? (
              <h5 className=" text-danger">{getdata.level}</h5>
            ) : (
              <h5 className="text-warning">{getdata.level}</h5>
            )}
          </div>
          <div>
            <h5>
              <FontAwesomeIcon icon={faHeart} className="text-danger" />
              <span className="mx-1">123</span>
            </h5>
          </div>
        </div>
        <hr style={{ marginTop: "0rem" }}></hr>

        {/* Here is full question */}
        <div>
          <p>
            {getdata.question}Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip consequat.
          </p>
        </div>
      </>
    );
  }

  function GetSolution() {
    return (
      <>
        <SyntaxHighlighter language={getLanguage} style={coldarkCold}>
          {codeString}
        </SyntaxHighlighter>
      </>
    );
  }

  return (
    <>
      <div className="container d-flex  gap-4">
        <div className=" w-50">
          {/* There is two btn one for description and one for comments */}
          <div className="d-flex justify-content-start gap-2 mb-3">
            <div>
              <button
                className={`btn btn-outline-secondary ${
                  isComments === false ? "active" : ""
                }`}
                onClick={() => setIsComments(false)}
              >
                Description
              </button>
            </div>
            <div>
              <button
                className={`btn btn-outline-secondary ${
                  isComments === true ? "active" : ""
                }`}
                onClick={() => setIsComments(true)}
              >
                Comments
              </button>
            </div>
          </div>
          <div className="text-danger">{message}</div>
          {isComments === true ? <GetComment /> : <GetQuestionData />}
        </div>
        <div className="w-50 ">
          <div>
            <SelectLanguage />
          </div>
          <GetSolution />
        </div>
      </div>
    </>
  );
};

export default QuestionByID;
