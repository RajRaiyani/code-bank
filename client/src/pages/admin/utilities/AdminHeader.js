
import { Link,useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const Header = (props) => {

	var navigate = useNavigate();
	function logOut(){
		cookie.remove("userToken");
		navigate("/");
	}
	return (
		<>
			<nav className="navbar bg-body-tertiary">
				<div className="container-fluid">
					<button className="btn btn-outline-success px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
						<span className="fs-5 me-2">&#x205D;</span> {props.name}
					</button>
					<div className="offcanvas offcanvas-start" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
						<div className="offcanvas-header">
							<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Options</h5>
							<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div className="d-flex flex-column justify-content-between" style={{height:"100%"}}>
							<div className="list-group mt-5">
								<Link to="/owner" className="list-group-item text-center p-4 fs-5 list-group-item-action">Dash Board</Link>
								<Link to="/owner/table" className="list-group-item text-center p-4 fs-5 list-group-item-action">Tables</Link>
								<Link to="/owner/item" className="list-group-item text-center p-4 fs-5 list-group-item-action">Food Items</Link>
							</div>
							

							<div className="list-group mt-5">
								<Link to="/" className="list-group-item text-center p-3 list-group-item-action">Home</Link>
								<button onClick={logOut} className="list-group-item text-center p-3 text-danger list-group-item-action">Log Out</button>
							</div>

						</div>

					</div>
				</div>
			</nav>
		</>
	)
}

export default Header;