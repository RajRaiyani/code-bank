import { useState } from "react";
import LikeButton from "../../utilities/likebutton";
import "./css/common.css"
import "./css/commonComponent.css"
import "./css/index.css"
import "./css/useless.css"
import { get } from "mongoose";



function GetQuestionData(props) {
    const [getdata, setdata] = useState(props.data);
    const [cat, setcatagro] = useState([]);

console.log(props.data);
    return (
        <>




            <div className="mt-3">
                <div className="fs-5"><span className="fs-4 fw-bolder">{props.data.number}</span>  {props.data.title}
                </div>
                <div className="d-flex justify-content-between"><span><span className="text-danger"> {getdata.level === "esay" ? (
                        <span className="text-success ">{props.data.level}</span>
                    ) : getdata.level === "hard" ? (
                        <span className=" text-danger">{props.data.level}</span>
                    ) : (
                        <span className="text-warning">{props.data.level}</span>
                    )}</span></span>
                 </div>
            </div>

            <div className="questionBox p-3 rounded">
                {props.data.question}
            </div>
        </>
    );
}

export default GetQuestionData;