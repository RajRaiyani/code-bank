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
        


			

			<div class="commentBox mt-3">

				
          <div className="text-primary">{message}</div>
    
        {data.map((item, index) => (
      <div key={index}>
        
        <div class="comment-card m-3 border border-color-main rounded p-3">
					<div class="d-flex justify-content-between">
						<div><span class="fs-5 px-2 py-1 userName-coin">{item.user.username[0]}</span> {item.user.username}</div>
            <p className="text-muted small mb-0">{item.date}</p>

					</div>
					<div class="pt-3">
          {item.data}
						
					</div>
				</div>

            {status ==="admin" ?
          <><button
          type="button"
          className="btn btn-outline-danger ms-5" onClick={()=>{deleteitem(item._id)}}><AiOutlineDelete /></button></>:<></>}
          

        <p className="mt-3 mb-2 pb-2">
          
        </p>
          
      </div>
    ))}
			</div>

        </>
    )
}

export default PrintComment;