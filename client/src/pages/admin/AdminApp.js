import "../../sideNavBar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { faList, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminApp = () => {
  var navigate = useNavigate();

  const [isExpanded, setExpendState] = useState(false);

  const menuItems = [
    {
      text: "Programs",
      icon: "images/grid.svg",
      path: "/admin/Program",
    },
   
    {
      text: "Mange User ",
      icon: "images/settings.svg",
      path : "/admin/HandleUSer"
    }, 
    {
      text: "Switch As a User",
      icon: "images/user.svg",
      path:"/user/home"
    }
  ];

  useEffect(() => {
    if (!cookie.get("adminToken")) {
      navigate("/login");
    }
  }, [navigate]);

  function logOut() {
    cookie.remove("adminToken");
    navigate("/");
  }

  return (
    <>
      {/* <nav className="navbar bg-body-tertiary">
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
                                <Link to="/admin/HandleUSer/mangeUser" className="list-group-item text-center p-4 fs-5 list-group-item-action" data-bs-dismiss="offcanvas">Mange Student</Link>
                                <Link to="/admin/Program" className="list-group-item text-center p-4 fs-5 list-group-item-action" data-bs-dismiss="offcanvas">Mange Question</Link>

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
            <Footer></Footer> */}
      <div className="d-flex gap-3" style={{ backgroundColor: " #DFE5EF" }}>
        <div
          className={
            isExpanded
              ? "side-nav-container display_none"
              : "side-nav-container side-nav-container-NX display_none"
          }
        >
          <div className="nav-upper">
            <div
              className={`d-flex ${
                isExpanded
                  ? "justify-content-center"
                  : "justify-content-start p-2"
              } pt-3`}
              style={{ paddingLeft: "4px" }}
            >
              <div>
                {isExpanded && (
                  <div className="nav-brand d-flex">
                    <img src="images/Logo.svg" alt="" srcset="" />
                    <h2>Code_Bank </h2>
                  </div>
                )}
              </div>
              <div
                className="px-3 d-flex align-items-center justify-content-center"
                onClick={() => setExpendState(!isExpanded)}
              >
                <FontAwesomeIcon
                  icon={isExpanded === true ? faXmark : faList}
                  style={{ fontSize: "2rem" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "30px" }}>
              {menuItems.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className={`text-uppercase text-color-light d-flex ${
                    isExpanded
                      ? "justify-content-start pl-2 gap-2"
                      : "justify-content-center my-3 p-2"
                  } align-items-center nav-item`}
                  style={{
                    fontSize: "1rem",
                    margin: `${isExpanded ? "4px 20px" : "8px"}`,
                  }}
                >
                  <div>
                    <img
                      style={{
                        margin: `${isExpanded ? "4px 20px" : "8px"}`,
                      }}
                      src={item.icon}
                      fill="black"
                      width={30}
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div>
                    {isExpanded && (
                      <p style={{ margin: "10px" }}>{item.text}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-footer">
            <div
              className={`pi-auto d-flex ${
                isExpanded ? "justify-content-around" : "justify-content-center"
              }`}
            >
              {isExpanded && (
                <div className="d-flex">
                  <img
                    src="/images/admin-avatar.svg"
                    alt=""
                    style={{ width: "100px", padding: "0 20px" }}
                    srcset=""
                  />
                  <div className="nav-footer-info">
                    <p style={{ fontSize: "18px", fontWeight: "900" }}>Master admin</p>
                    <p style={{ marginTop: "-15px", color: "gray" }}>
                      
                    Darshan University
                    </p>
                  </div>
                </div>
              )}
              <img
                style={{ margin: `${isExpanded ? "4px 20px" : "8px"}` }}
                src="images/logout.svg"
                width={35}
                alt=""
                srcset=""
                onClick={logOut}
              />
            </div>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
};
export default AdminApp;
