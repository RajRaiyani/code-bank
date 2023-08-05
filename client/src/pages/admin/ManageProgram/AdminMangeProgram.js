
import { useState, useRef } from "react";

import "../../../index.css";
import Cookies from "js-cookie";
import { useNavigate, Link, } from "react-router-dom";
import QuestionDatach from "../../../Hooks/useQuestionData";
import AllQuestion from "../../../utilities/AllQuestion";
import AdminProgram from "./Program";

const AdminAddProgram = () => {
  const navigate = useNavigate();
  const [dataforpop, setdatapop] = useState("");
  const [data1, setData1] = QuestionDatach();
  const [message, setMessage] = useState("");
  function checkNavigate(id) {
    if (!Cookies.get("adminToken")) {
      navigate("login");
    }
    else {
      navigate("/admin/Program/" + id);
    }
  }
  function assigendata(props) {
    setdatapop(props);
  }

  function DeleteData(props) {
    fetch("http://localhost:3007/api/v1/admin/question/delete/", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "token": Cookies.get("adminToken")
      },
      body: JSON.stringify({ question_id: props })
    }).then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          setData1(data1.filter((element) => element._id !== props));
        }
        else {
          setMessage(res.message);
        }

      })
      .catch((e) => {
        console.log(e);
      })

  }

  // ============================
  return (
    <>
      <div
        className="overflow-scroll"
        style={{ height: "100vh", width: "95%" }}
      >
        <div className="d-flex justify-content-between display_block ">
          <Link to="/admin/Program/AddQuestion">
            <button type="button" className="btn btn-outline-success m-5 fs-4">
              Add Question+
            </button>
          </Link>
          <Link to="/admin/Program/MangeCatagory">
            <button type="button" className="btn btn-outline-success m-5 fs-4">
              Add catagory+
            </button>
          </Link>

          <Link to="/admin/Program/MangeLanguage">
            <button type="button" className="btn btn-outline-success m-5 fs-4">
              Add language+
            </button>
          </Link>
        </div>
        {/* delete pop op */}
        


        <div className="container">


          <AdminProgram />
        </div>
      </div>
    </>
  );
}
export default AdminAddProgram;