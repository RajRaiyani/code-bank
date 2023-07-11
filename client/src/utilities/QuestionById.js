import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../App.css";
import LikeButton from "./likebutton";
import PrintComment from "./printcomment";
import useGetQuestionDataById from "../Hooks/useGetQuestionDataById"
import addComment from "./addComment";

const QuestionByID =   (props) => {
  
  const { id } = useParams();

  //all the data store in data varible
  const [getdata, setData,error,setError] =  useGetQuestionDataById(id);
  // const [getdata, setGetdata] = useState([]);
  const [message, setMessage] = useState("");
  const [solution, setsolution] = useState([]);
  // const [comments, setc] = useState([]);
  const [isComments, setIsComments] = useState(false);
  const [status, setstatus] = useState("");
  const [commentmessage, setcomment] = useState("");
  const [cat, setcatagro] = useState([]);
  const [rescomment, setresponse] = useState("");
  const navigate = useNavigate();
  const [arrayValues, setArrayValues] = useState([]);
  const [res, setres] = useState();

  // console.log(getdata)
  console.log(getdata.solutions)

  function GetComment() {
    async function SendComment() {

      var [res,cdata] = await addComment(id,commentmessage,() => navigate("/login"));

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
              onChange={(e) => { setcomment(e.target.value) }}
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
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => { setcomment("") }}>
            Cancel
          </button>
        </div>

        {/* {getdata.comments.map((e) => {
        })} */}
        <PrintComment data={getdata.comments} />
      </>
    );
  }
  function GetQuestionData() {

    return (
      <>
        {/* Here is short problem statement  */}
        <div>
          <h4>
            <b className="lead-font-size">{getdata.number} {getdata.question}</b>
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
          {cat.map((e) => {
            return (
              <>
                {e}
              </>
            )
          })}
          <div>

          </div>
          <div>
            <h5>
              <LikeButton status={status} nolike={getdata.likes}></LikeButton>

            </h5>
          </div>
        </div>
        <hr style={{ marginTop: "0rem" }}></hr>

        {/* Here is full question */}
        <div>
          <p>
            {getdata.question}
          </p>
        </div>
      </>
    );
  }
  function GetSolution() {

    return (
      <>
        {
          getdata.solutions.map((e) => {
            return (
              <>
                <div className="w-50 xs_width text-center border">{e.language}</div>
                
                <SyntaxHighlighter language={e.language} style={coldarkCold}>
                  {e.code}
                </SyntaxHighlighter>
              </>
            );

          })
        }
      </>
    )

  }

  return (
    <>
      <div className="container d-flex  gap-4  display_block">
        <div className=" w-50 xs_width">
          {/* There is two btn one for description and one for comments */}
          <div className="d-flex justify-content-start gap-2 mb-3">
            <div>
              <button
                className={`btn btn-outline-secondary ${isComments === false ? "active" : ""
                  }`}
                onClick={() => setIsComments(false)}
              >
                Description
              </button>
            </div>
            <div>
              <button
                className={`btn btn-outline-secondary ${isComments === true ? "active" : ""
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
          <GetSolution />
        </div>
      </div>
    </>
  );
};

export default QuestionByID;


    //   console.log("%c"+commentmessage,"color:red")
    //   fetch("http://localhost:3007/api/v1/home/question/" + id + "/comment", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Token': Cookies.get("userToken")
    //     },
    //     body: JSON.stringify({ data: commentmessage })
    //   }).then((res) => (res.json()))
    //     .then((res) => {
    //       if (res.status === "OK") {
    //         setresponse("comment send succesfully ");
    //         let temp = {...res.data}
    //         temp.user = {_id:res.data.user_id,username:res.data.username};
    //         temp.user_id = undefined;
    //         temp.username = undefined;
    //         setc([temp,...comment]);
    //         setcomment("");
    //       } else if (res.status === "EXPIRED_TOKEN") {
    //         navigate("/login");
    //       } else {
    //         setresponse(res.message);
    //       }
    //       setTimeout(() => {
    //         setresponse('');
    //       }, 2000);

    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     })

    // }
