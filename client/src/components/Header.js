import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "../css/components.css"
import {GiHamburgerMenu} from "react-icons/gi"

const Header = (props) => {
  var navigate = useNavigate();
  function IfLogged() {
    if (!props.isLoggedIn) {
      return (
        <li >
          <Link to="/login">
            <button className="btn btn-outline-secondary secondary-color mx-2 header-btn" type="button">
              Log in/Sign in
            </button>
          </Link>
        </li>
      );
    } else {
      return (
        <>
          <li className="dropdown">
            <button
              className="btn px-4 fw-bolder rounded-pill btn-outline-success mx-3 header-btn"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* {props.name.charAt(0).toUpperCase()} */}
              {Cookies.get("username")}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button onClick={removeToken} className="dropdown-item">
                  Log out
                </button>
              </li>
            </ul>
          </li>
        </>
      );
    }
  }
  function removeToken() {
    Cookies.remove("userToken");
    props.setLogInStatus(false);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg  border-bottom border-dark mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-dark">
          <Logo />
        </Link>

        <button
          className="navbar-toggler outline-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <GiHamburgerMenu className="secondary-color" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-items">
              <Link to="/about" className="nav-link secondary-color" href="#">
                About
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/contact" className="nav-link secondary-color" href="#">
                Contact
              </Link>
            </li>
            <IfLogged />
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
