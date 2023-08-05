import { useEffect, useState } from "react";
import { useParams, useNavigate , Link} from "react-router-dom";
import Cookies from "js-cookie";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../App.css";
import LikeButton from "./likebutton";
import PrintComment from "../pages/QuestionById/printcomment";
import useGetQuestionDataById from "../Hooks/useGetQuestionDataById"
import addComment from "./addComment";
import GetQuestionData from "../pages/QuestionById/Discription";
import GetC from "../pages/QuestionById/comment";
import { get } from "mongoose";

const QuestionByIDAdmin1 =   (props) => {
  
  const { id } = useParams();
  const [getdata, setData,error,setError] =  useGetQuestionDataById(id);
  const [message, setMessage] = useState("");
  const [isComments, setIsComments] = useState(false);
  const [commentmessage, setcomment] = useState("");
  const [rescomment, setresponse] = useState("");
  const [solution, setsolution] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
  setsolution(getdata.solutions);

  if(!Cookies.get("adminToken"))
  {
    navigate("/login");
  }

  })
  console.log(solution);
  const username=Cookies.get("username")

  function GetComment() {
    async function SendComment() {

      var [res,cdata] = await addComment(id,commentmessage,setcomment(),() => navigate("/login"));

    }
    

    return (
      <>
        <div className="text-primary">{rescomment}</div>
       

<div class="">
				<div><span class="fs-4 px-3 py-2 userName-coin">{username[0]}</span> {username}</div>
				<form action="" class="mt-3 d-flex justify-content-between">
					<input type="text" class="comment-input" placeholder="Comment....."  autoFocus="autoFocus"
              value={commentmessage}
              onChange={(e) => { setcomment(e.target.value) }}
              id="textAreaExample"
              rows="4"
              style={{ backgroundColor: "#fff" }}
              />
					<button class="button-2 button-type-box rounded px-3 py-1 fw-bold fs-6" onClick={SendComment}>POST</button>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => { setcomment("") }}>
            Cancel
          </button>
				</form>
			</div>


         
         

        {/* {getdata.comments.map((e) => {
        })} */}
        <PrintComment data={getdata.comments} />
      </>
    );
  }
  
  function GetSolution() {
    function deleteitem(id) {
      fetch("http://localhost:3007/api/v1/admin/solution/delete/", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "token": Cookies.get("adminToken")
        },
        body: JSON.stringify({ solution_id: id })
      }).then(res => res.json())
        .then(res => {
          if (res.status === "OK") {
            setsolution(solution.filter((item) => item._id !== id));
            setMessage("solution delete succesfully");
          }
          else {
            setMessage(res.message);
            console.log(res);
          }
          setTimeout(() => {
            setMessage('');
          }, 2000);

        })
        .catch((e) => {
          console.log(e);
        })
    }
    return (
      <>
			<div class="solutionBox p-4 mt-3">
        {
          getdata.solutions.map((e) => {
            return (
              <>
              <div class="solution-card p-3 rounded-3 my-4">
					<div class="d-flex justify-content-between">
						<div class="solution-title p-2 rounded">{e.title}
            <button
                    type="button"
                    className="btn btn-outline-danger ms-5" onClick={() => { deleteitem(e._id) }}>Delete Solution</button>
            </div>
						<div class="text-color-main fs-3">&#x26A3;</div>
					</div>

				{e.code}
				</div>
                {/* <div className="w-50 xs_width text-center border">{e.language}</div>
                <SyntaxHighlighter language={e.language} style={coldarkCold}>
                  {e.code}
                </SyntaxHighlighter> */}
              </>
            );
          })
        }
			</div>

      </>
    )

  }

  return (
    <>
      <div className="m-3 d-flex  gap-4  display_block">
        <div className=" w-50 xs_width">
          {/* There is two btn one for description and one for comments */}
          <div className="d-flex justify-content-start gap-2 mb-3">
            <div>
              <div class="mt-4">
				<button className={`btn border-cancel-end button-1 ${isComments === false ? "active" : ""
                  }`}
                onClick={() => setIsComments(false)}>Description</button>
				<button className={`btn border-cancel-start button-1 ${isComments === true ? "active" : ""
                  }`}
                onClick={() => setIsComments(true)}>Comments</button>
			</div>
            </div>
          </div>
          <div className="text-danger">{message}</div>
          {isComments === true ? <GetComment /> : <GetQuestionData data={getdata} />}
        </div>
        <div className="w-50 xs_width ">
          <GetSolution />

          <Link to={"/admin/program/Addsolution/" + id}>
        <button type="button" className="btn btn-outline-success m-5 fs-4">
          Add Solution+
        </button>
      </Link>
        </div>


      </div>
    </>
  );
};

export default QuestionByIDAdmin1;
