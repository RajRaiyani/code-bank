import Cookies from "js-cookie";


async function addComment(id,commentmessage,callback){



    let response = false;
    let newComment = "";
    




fetch("http://localhost:3007/api/v1/home/question/" + id + "/comment", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'token': Cookies.get("userToken") || Cookies.get("adminToken")
        },
        body: JSON.stringify({ data: commentmessage })
    }).then((res) => res.json())
        .then((res) => {
            if (res.status === "OK") {
                response = true;
                newComment = res.data;
                console.log(res.data);
            } else if (res.status === "EXPIRED_TOKEN") {
               callback();
            } 
        })
        .catch((e) => {
            console.log(e);
        })
        return [response,newComment];

}
export default addComment;