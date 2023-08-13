import Cookies from "js-cookie";

function deleteQuestionById(id , callback) {
    fetch("http://localhost:3007/api/v1/admin/question/delete/", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "token": Cookies.get("adminToken")
      },
      body: JSON.stringify({ question_id: id })
    }).then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
            console.log(res);
        }
        else {
            callback();
        }
      })
      .catch((e) => {
        console.log(e);
      })
      
  }
  export default deleteQuestionById;
