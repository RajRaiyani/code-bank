import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../css/components.css"
import Logo from "../../components/Logo"
import { GiFurnace } from "react-icons/gi";



const SignIn = () => {

    var navigate = useNavigate();

    const [data, setData] = useState({
      username: "",
      email: "",
      password: "",
      cpassword: "",
    });
    const [message, setMessage] = useState("");

    function handleData(e) {
      document.getElementById("exampleInputPassword2").style.borderColor ="#503524";
      document.getElementById("exampleInputPassword1").style.borderColor ="#503524";
        var name = e.target.name;
        var value = e.target.value;
        setData({ ...data, [name]: value });
    }
    function sendData(event) {
      event.preventDefault();
      if (data.password !== data.cpassword) {
        document.getElementById("exampleInputPassword2").style.borderColor =
          "red";
          document.getElementById("exampleInputPassword1").style.borderColor =
            "red";
        setMessage("passwords does not match");
      }
      else
       {
        fetch("http://localhost:3007/api/v1/authentication/SignIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === "OK") {
              navigate("/login");
              return;
            } else {
              setMessage(res.message);
              return;
            }
          })
          .catch((e) => {
            return console.log(e);
          });
      }
    }

    return (
      <>
        <div className="container-sm border position-absolute top-50 start-50 translate-middle login-box p-2 border-radius-15">
          <div className="d-flex justify-content-center pb-2 pt-2">
            <Logo />
          </div>

          <h3 className="text-center fw-bold secondary-color pb-2">Sign In</h3>
          <form onSubmit={sendData}>
            <div className="text-danger text-center fs-5">{message}</div>
            <div className="px-4 pb-3">
              <label
                for="exampleInputName"
                className="form-label mb-0 secondary-color fs-12"
              >
                Name
              </label>
              <input
                className="form-control border-color border-radius-15"
                id="exampleInputName"
                placeholder="Name"
                name="username"
                pattern="^[a-zA-Z\s]{3,}$"
                title="Please enter a valid name"
                required
                onChange={handleData}
              />
            </div>
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
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Please enter a valid email address"
                required
                onChange={handleData}
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
                pattern="^(?!\s)[^\s]{8,}$"
                title="Password must be atleast 8 characters long"
                onChange={handleData}
                required
              />
            </div>
            <div className="px-4 pb-3">
              <label
                for="exampleInputPassword2"
                className="form-label mb-0 secondary-color fs-12"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control border-color border-radius-15"
                id="exampleInputPassword2"
                name="cpassword"
                placeholder="password"
                onChange={handleData}
              />
            </div>
            <div>
              <div
                className="d-flex justify-content-center px-4 pb-3 fs-12 secondary-color"
                style={{ opacity: "0.5" }}
              >
                *Name containes minimum 3 characters
                <br />
                *Password must be atleast 8 characters long
              </div>
            </div>
            <div className="px-4 pb-4">
              <input
                type="submit"
                className="btn primary-bg w-100 fw-bold border-radius-15"
                style={{ color: "white" }}
              />
            </div>
          </form>
          <div className="pb-3">
            <span className="pl-3">Allready have account ?</span>
            <Link to="/signin" className="register-text ml-2">
              Sign In
            </Link>
          </div>
        </div>
      </>
    );
}

export default SignIn;