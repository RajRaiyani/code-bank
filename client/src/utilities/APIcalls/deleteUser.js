import Cookies from "js-cookie";

async function deleteUser(id,callback) {

    await fetch("http://localhost:3007/api/v1/admin/user/" + id + "/delete", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "token": Cookies.get("adminToken")
        }
    }).then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
            }
            else if (res.status === "EXPIRED_TOKEN") {
                callback();
            }
            else {
                callback();
            }
        })
        .catch(e => console.log("error : " + e));
}
export default deleteUser;