import Footer from "../../components/Footer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import cookie from "js-cookie";


const AdminApp = (props) => {
    var navigate = useNavigate();


   

    useEffect(() => {
        if (!cookie.get("token")) {
            console.log(cookie.get("token"))
            console.log("harshil");
            navigate("/");
        }
    }, [navigate]);

    function logOut() {
        cookie.remove("token");
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
                        <div className="d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                            <div className="list-group mt-5">
                                <Link to="/admin/user/mangeUser" className="list-group-item text-center p-4 fs-5 list-group-item-action" data-bs-dismiss="offcanvas">Mange Student</Link>
                                <Link to="/admin/MangeAdmin" className="list-group-item text-center p-4 fs-5 list-group-item-action" data-bs-dismiss="offcanvas">Mange Admin</Link>
                                <Link to="/owner/item" className="list-group-item text-center p-4 fs-5 list-group-item-action" data-bs-dismiss="offcanvas">Food Items</Link>
                            </div>


                            <div className="list-group mt-5">
                                <Link to="/admin" className="list-group-item text-center p-3 list-group-item-action" data-bs-dismiss="offcanvas">Home</Link>
                                <button onClick={logOut} className="list-group-item text-center p-3 text-danger list-group-item-action">Log Out</button>
                            </div>

                        </div>

                    </div>
                </div>
            </nav>
            <Outlet />
            <h1>admin dashboard</h1>
            <Footer></Footer>
        </>

    )


}
export default AdminApp;