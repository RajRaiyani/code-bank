/*<div class="container_101">

<section id="questionSection" class="w-50 p-4">

<div class="mt-4">
    <button class="btn border-cancel-end button-1">Description</button>
    <button class="btn border-cancel-start button-1">Comments</button>
</div>

<div class="mt-3">
    <div class="fs-5"><span class="fs-4 fw-bolder">23</span> This is the sort title of the question...?
    </div>
    <div class="d-flex justify-content-between"><span><span class="text-danger">&#x26AB;</span>level</span>
        <span class="text-color-main"><span class="fs-3 text-color-main">&#x2661;</span>243</span>
    </div>
</div>

<div class="">
    <div><span class="fs-4 px-3 py-2 userName-coin">R</span> User_Name</div>
    <form action="" class="mt-3 d-flex justify-content-between">
        <input type="text" class="comment-input" placeholder="Comment.....">
        <button class="button-2 button-type-box rounded px-3 py-1 fw-bold fs-6">POST</button>
    </form>
</div>

<div class="commentBox mt-3">

    <div class="comment-card m-3 border border-color-main rounded p-3">
        <div class="d-flex justify-content-between">
            <div><span class="fs-5 px-2 py-1 userName-coin">R</span> User_Name</div>
            <div>5:30 pm 4/5/23</div>
        </div>
        <div class="pt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ab velit similique magni
            expedita accusantium consequuntur ullam alias perferendis incidunt?
        </div>
    </div>
    <div class="comment-card m-3 border border-color-main rounded p-3">
        <div class="d-flex justify-content-between">
            <div><span class="fs-5 px-2 py-1 userName-coin">R</span> User_Name</div>
            <div>5:30 pm 4/5/23</div>
        </div>
        <div class="pt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ab velit similique magni
            expedita accusantium consequuntur ullam alias perferendis incidunt?
        </div>
    </div>
    <div class="comment-card m-3 border border-color-main rounded p-3">
        <div class="d-flex justify-content-between">
            <div><span class="fs-5 px-2 py-1 userName-coin">R</span> User_Name</div>
            <div>5:30 pm 4/5/23</div>
        </div>
        <div class="pt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ab velit similique magni
            expedita accusantium consequuntur ullam alias perferendis incidunt?
        </div>
    </div>
    <div class="comment-card m-3 border border-color-main rounded p-3">
        <div class="d-flex justify-content-between">
            <div><span class="fs-5 px-2 py-1 userName-coin">R</span> User_Name</div>
            <div>5:30 pm 4/5/23</div>
        </div>
        <div class="pt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ab velit similique magni
            expedita accusantium consequuntur ullam alias perferendis incidunt?
        </div>
    </div>
    <div class="comment-card m-3 border border-color-main rounded p-3">
        <div class="d-flex justify-content-between">
            <div><span class="fs-5 px-2 py-1 userName-coin">R</span> User_Name</div>
            <div>5:30 pm 4/5/23</div>
        </div>
        <div class="pt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ab velit similique magni
            expedita accusantium consequuntur ullam alias perferendis incidunt?
        </div>
    </div>

</div>*/
import addComment from "../../utilities/addComment";
import { useState } from "react";
import { useNavigate ,useParams } from "react-router-dom";
import useGetQuestionDataById from "../../Hooks/useGetQuestionDataById";
import PrintComment from "./printcomment";


function GetComment() {
    const { id } = useParams();
const [commentmessage, setcomment] = useState("");
const [rescomment, setresponse] = useState("");
const [getdata, setData,error,setError] =  useGetQuestionDataById(id);

const navigate = useNavigate();

    async function SendComment() {

      var [res,cdata] = await addComment(id,commentmessage,() => navigate("/login"));

    }
    

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

  export default GetComment;