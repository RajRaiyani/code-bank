import { useState } from "react";

function PrintComment(props){
    const [data , setdata]=useState([props.data]);
    console.log(data);

    return(
        <>
    
        
    
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
    )
}

export default PrintComment;