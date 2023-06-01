import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  var navigate = useNavigate();
  function IfLogged() {
    if (!props.isLoggedIn) {
      return (
        <li className="nav-item">
          <Link to="/login">
            <button className="btn btn-outline-secondary ms-2" type="button">
              Log in/Sign in
            </button>
          </Link>
        </li>
      );
    } else {
      return (
        <>
          <li className="nav-item dropdown">
            <button
              className="btn px-4 fw-bolder rounded-pill btn-outline-success mx-3 "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* {props.name.charAt(0).toUpperCase()} */}user name
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
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-dark">
          Code Bank
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-dark"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-dark" href="#">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-dark" href="#">
                Contact
              </Link>
            </li>

            <li className="nav-item"></li>
            <IfLogged />
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
