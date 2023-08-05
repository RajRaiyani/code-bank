import { useState, useEffect } from "react";
import "../../../index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../../css/components.css"

import QuestionDatach from "../../../Hooks/useQuestionData";
import SearchBtn from "../../../components/Search";
import GetCatagary from "../../../components/GetCategory";
import GetLevel from "../../../components/GetLevel";
import { AiOutlineDelete } from 'react-icons/ai';

function AdminProgram(props) {
    const navigate = useNavigate();
    const [data1, setData1] = QuestionDatach();
    const [level, setlevel] = useState("");
    const [dataforpop, setdatapop] = useState("");
    const [message, setMessage] = useState("");

    function checkNavigate(id) {
        if (!Cookies.get("adminToken")) {
            navigate("login");
        } else {
            navigate("/user/question/" + id);
        }
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

    var filterdata = level ? data1.filter((e) => e.level === level) : data1;
    function GetDataF() {

        return filterdata.map((program) => {
            function assigendata(props) {
                setdatapop(props);
                const isConfirmed = window.confirm('Are you sure you want to delete the data?');
                if (isConfirmed) {
                    DeleteData(props._id);
                }
            }
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

                                <div style={{ display: "flex", justifyContent: "right" }}>
                            <button
                                type="button"
                                className="btn btn-outline-danger"

                                onClick={(e) => {
                                    e.stopPropagation();
                                    assigendata(program);
                                }}
                            >
                                Delete <AiOutlineDelete />
                            </button>
                        </div>
                                </span></div>
                            <div>

                                {program.level === "Easy" ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
#7CC529" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                        <span style={{ paddingLeft: "0.5rem" }}>{program.level}</span>
                                    </>
                                ) : program.level === "Hard" ? (<>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
                #E47171" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                        <circle cx="8" cy="8" r="8" />
                                    </svg>
                                    <span style={{ paddingLeft: "0.5rem" }}>{program.level}</span>
                                </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="
                #FFB444" className="bi bi-circle-fill" viewBox="0 0 16 16">
                                            <circle cx="8" cy="8" r="8" />
                                        </svg>
                                        <span style={{ paddingLeft: "0.5rem" }}>{program.level}</span>

                                    </>
                                )}
                            </div>

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
                    <div className="col-md-12 main_box col-sm-12" >
                        <GetDataF />
                    </div>

                </div>
            </div>
        </>
    );
};
export default AdminProgram;
