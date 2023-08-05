import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import cookie from "js-cookie";
import Logo from "../../components/Logo";
import "../../css/components.css";

const LogIn = (props) => {
  console.log("hit login");

  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  var navigate = useNavigate();

  function handleData(e) {
    var name = e.target.name;
    var value = e.target.value;
    setData({ ...data, [name]: value });
  }

  function sendData(e) {
    
    e.preventDefault();
    fetch("http://localhost:3007/api/v1/authentication/LogIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "OK") {
          if (res.role === "user") {
            cookie.set("userToken", res.token, {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            cookie.set("username", res.username, {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            navigate("/user/home");
          }
          if (res.role === "admin") {
            cookie.set("username", res.username+" admin", {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            cookie.set("adminToken", res.token, {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            cookie.set("userToken", res.token, {
              expires: new Date().getTime() + 2 * 1000 * 3600,
            });
            navigate("/admin");
          }
        }
        setMessage(res.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div className="container-sm border position-absolute top-50 start-50 translate-middle login-box p-2 border-radius-15">
        <div className="d-flex justify-content-center pb-2 pt-2">
          <Logo />
        </div>
        <h3 className="text-center fw-bold secondary-color pb-2">Log In</h3>
        <form onSubmit={sendData}>
        <div className="text-danger text-center fs-5">{message}</div>
        
        <div className="px-4 pb-3">
          <label
            for="exampleInputEmail1"
            className="form-label mb-0 secondary-color fs-12"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control border-color border-radius-15"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            name="email"
            onChange={handleData}
            required
          />
        </div>
        <div className="px-4 pb-4">
          <label
            for="exampleInputPassword1"
            className="form-label mb-0 secondary-color fs-12"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control border-color border-radius-15"
            id="exampleInputPassword1"
            name="password"
            placeholder="password"
            onChange={handleData}
            required
          />
        </div>
        <div className="px-4 pb-4">
          <input
          type="submit"
            className="btn primary-bg w-100 fw-bold border-radius-15"
            style={{ color: "white" }}
            value="Log In"
          />
          
        </div>
        </form>
        <div className="pb-3">
          <span className="pl-3">Don't have an account ? </span>
          <Link to="/signin" className="register-text">
            Register here
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
