import { use } from "express/lib/router";
import { useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import Cookies from "js-cookie";

function PrintComment(props){
    const [data , setdata]=useState(props.data);
    const [status , setstatus]=useState(props.status);
    const [message,setMessage]=useState("");
    function deleteitem(id){
      fetch("http://localhost:3007/api/v1/admin/comment/delete/", {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				"token": Cookies.get("adminToken")
			},
			body: JSON.stringify({ comment_id: id })
		}).then(res => res.json())
			.then(res => {
				if (res.status === "OK") {
          setdata(data.filter((item,index) => item._id !== id));
          setMessage("comment delete succesfully");
				}
				else {
					setMessage(res.message);
				}
        setTimeout(() => {
          setMessage('');
        }, 2000);

			})
			.catch((e) => {
				console.log(e);
			})
    }

    return(
        <>
          <div className="text-primary">{message}</div>
    
        {data.map((item, index) => (
      <div key={index}>
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
            {item.user.username}
            {status ==="admin" ?
          <><button
          type="button"
          className="btn btn-outline-danger ms-5" onClick={()=>{deleteitem(item._id)}}><AiOutlineDelete /></button></>:<></>}
            </h6>
            <p className="text-muted small mb-0">{item.date}</p>
          </div>
        </div>

        <p className="mt-3 mb-2 pb-2">
          {item.data}
        </p>
          
      </div>
    ))}
        </>
    )
}

export default PrintComment;