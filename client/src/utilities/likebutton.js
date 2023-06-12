import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LikeButton(props) {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const [liked, setLiked] = useState(props.status);
    const [message, setMessage] = useState("");
    const [nolike , setnolike]=useState(props.nolike);
    const handleLike = () => {

        fetch("http://localhost:3007/api/v1/home/question/" + id + "/like", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: Cookies.get("userToken"),
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "OK") {
                    setLiked(res.like);
                } else if (res.status === "EXPIRED_TOKEN") {
                    navigate("/login");
                } else {
                    setMessage(res.message);
                    console.log(res);
                }
            })
            .catch((e) => console.log("error : " + e));
        setLiked(!liked);
    };
    return (
        <>
            {liked === "true" ?
            <>
                <div className="btn btn-outline-danger" onClick={handleLike}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>

                </div>
                {nolike}
                </>
                :
                <>
                <div className=" btn btn-outline-danger" onClick={handleLike}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>

                </div>
                {nolike}
                </>
            }
        </>
    )
}

export default LikeButton;