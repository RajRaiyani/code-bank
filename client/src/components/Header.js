
import { Link } from "react-router-dom";

const Header = (props) => {
	


	

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-dark">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand text-dark">Code Bank</Link>

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

				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/" className="nav-link text-dark" aria-current="page" href="#">Home</Link>
						</li>
						<li className="nav-item">
							<Link to="/about" className="nav-link text-dark" href="#">About</Link>
						</li>
						<li className="nav-item">
							<Link to="/contact" className="nav-link text-dark" href="#">Contact</Link>
						</li>

						<li className="nav-item">
					<Link to="/login">
						<button className="btn btn-outline-secondary ms-2" type="button">Log in/Sign in</button>
					</Link>
				</li>

					</ul>

				</div>
			</div>
		</nav>
	)
}
export default Header;