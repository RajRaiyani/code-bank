import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const QuestionByIDAdmin = () => {
  const { id } = useParams();
  const [getdata, setGetdata] = useState([]);
  const [message, setMessage] = useState("");
    const [getLanguage, setLanguage] = useState("javascript");
  const navigate = useNavigate();
   const codeString = `
  	num += 1
   	e.stopPropagation();
    console.log("sub");
	console.log("main");
  `;

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

    function GetSolution() {
      return (
        <>
          <SyntaxHighlighter language={getLanguage} style={duotoneLight}>
            {codeString}
          </SyntaxHighlighter>
        </>
      );
    }

    function SelectLanguage() {
      return (
        <>
          <select
            className="form-select"
            value={getLanguage}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            style={{ backgroundColor: "#fcfcf4" }}
          >
            <option value="java">java</option>
            <option value="python">python</option>
            <option value="javascript">javascript</option>
          </select>
        </>
      );
    }

  return (
    <div className="overflow-auto w-100" style={{ height: "100vh" }}>
      <div>
        <Link to={"/admin/program/Addsolution/" + id}>
          <button type="button" className="btn btn-outline-success m-5 fs-4">
            Add Solution+
          </button>
        </Link>
      </div>
      <div className="container d-flex  gap-4  display_block">
        <div className="text-danger">{message}</div>
        <div className="w-50 xs_width">
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
              {getdata.question}Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip consequat.
            </p>
          </div>
        </div>
        <div className="w-50 xs_width">
          <div>
            <SelectLanguage />
          </div>
          <GetSolution />
        </div>

        {/* <div className="p-2 ">
          <b>{getdata.number} Question Name</b>
        </div>
        <div className="ps-2 pt-1">
          {getdata.level === "esay" ? (
            <span className="py-3 text-success">{getdata.level}</span>
          ) : getdata.level === "hard" ? (
            <span className="py-3 text-danger">{getdata.level}</span>
          ) : (
            <span className="py-3 text-warning">{getdata.level}</span>
          )}

          <span className="ps-5">
            <FontAwesomeIcon icon={faHeart} /> ,
            <span className="text-secondary"> Likes count </span>
            <span className="text-secondary ps-5">
              {" "}
              <FontAwesomeIcon icon={faShare} />
              share button
            </span>
          </span>
          <hr style={{ width: "70%" }}></hr>
          <div className="pt-2">
            <b>Question</b> :{getdata.question}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default QuestionByIDAdmin;
