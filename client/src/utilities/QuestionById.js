import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../App.css";
import LikeButton from "./likebutton";
const QuestionByID = () => {
  const { id } = useParams();
  const [getdata, setGetdata] = useState([]);
  const [message, setMessage] = useState("");
  const [comment , setc]=useState([]);
  const [isComments, setIsComments] = useState(false);
  const [commentmessage , setcomment]=useState("");
  const [rescomment ,setresponse ]=useState("");
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
          setc(getdata.comments);

        } else if (res.status === "EXPIRED_TOKEN") {
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
    function SendComment()
    {
      fetch("http://localhost:3007/api/v1/home/question/" +id+"/comment", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
        'Token': Cookies.get("userToken")
			},
			body: JSON.stringify({data:commentmessage})
		}).then((res) => (res.json()))
			.then((res) => {
				if (res.status === "OK") {
					setresponse("comment send succesfully");

          setcomment("");
         
      
					}else if (res.status === "EXPIRED_TOKEN") {
            navigate("/login");
          } else {
            setresponse(res.message);
          }
          setTimeout(() => {
            setresponse('');
          }, 2000);

			})
			.catch((e) => {
				console.log(e);
			})

    }
    
    return (
      <>
      
    <div className="text-primary">{rescomment}</div>
        <div className="d-flex flex-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="/images/profile.png"
            alt="avatar"
            width="40"
            height="40"
          />
          
          <div className="form-outline  w-100 mb-2">
            <input
              className="form-control"
              autoFocus="autoFocus"
              value={commentmessage}
              onChange={(e)=>{setcomment(e.target.value)}}
              id="textAreaExample"
              rows="4"
              style={{ backgroundColor: "#fff" }}
              placeholder="Message"
            ></input>
          </div>
        </div>
        <div className="d-flex gap-2 mb-2  justify-content-end w-100">
          <button type="button" className="btn btn-primary btn-sm" onClick={SendComment}>
            Post comment
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={()=>{setcomment("")}}>
            Cancel
          </button>
        </div>

    {getdata.comments.map((e)=>{
      <h1>hii</h1>
    })}
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
             <LikeButton status="true" nolike={getdata.likes}></LikeButton>
             <span className="mx-1">{getdata.likes}</span>
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
  console.log(getdata)

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
      <div className="container d-flex  gap-4  display_block">
        <div className=" w-50 xs_width">
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
        <div className="w-50 xs_width ">
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
