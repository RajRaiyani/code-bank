import React, { useState } from "react";
import "./sideNavBar.css";

const Try = () => {
  const [isExpanded, setExpendState] = useState(false);

  const menuItems = [
    {
      text: "Dashboard",
      icon: "images/grid.svg",
  
    },
    {
      text: "Admin Profile",
      icon: "images/user.svg",
    },
    {
      text: "Messages",
      icon: "images/message.svg",
    },
    {
      text: "Analytics",
      icon: "images/pie-chart.svg",
    },
    {
      text: "File Manager",
      icon: "images/folder.svg",
    },
    {
      text: "Orders",
      icon: "images/shopping-cart.svg",
    },
    {
      text: "Settings",
      icon: "images/settings.svg",
    },
  ];

  return (
    <>
      {/* <div style={{ backgroundColor: " #DFE5EF" }}>
        <div
          className={
            isExpanded
              ? "side-nav-container"
              : "side-nav-container side-nav-container-NX"
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
              {menuItems.map(({ text, icon }) => (
                <a
                  className={`text-uppercase text-color-light d-flex ${
                    isExpanded
                      ? "justify-content-start pl-2 gap-2"
                      : "justify-content-center my-3 p-2"
                  } align-items-center nav-item`}
                  style={{
                    fontSize: "1rem",
                    margin: `${isExpanded ? "4px 20px" : "8px"}`,
                  }}
                  href="#"
                >
                  <div>
                    <img
                      style={{ margin: `${isExpanded ? "4px 20px" : "8px"}`,color:"black" }}
                      src={icon}
                      fill="black"
                      width={30}
                      alt=""
                      srcset=""
                    />
                  </div>
                  <div>
                    {isExpanded && <p style={{ margin: "10px" }}>{text}</p>}
                  </div>
                </a>
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
                    <p style={{ fontSize: "18px", fontWeight: "900" }}>
                     hrsu
                    </p>
                    <p style={{ marginTop: "-15px", color: "gray" }}>
                    Master admin
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
              />
            </div>
          </div>
        </div>
      </div> */}
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
  <a href="index3.html" class="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
         style={{opacity: ".8"}} />
    <span class="brand-text font-weight-light">AdminLTE 3</span>
  </a>

  <div class="sidebar">
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
      </div>
      <div class="info">
        <a href="#" class="d-block">Alexander Pierce</a>
      </div>
    </div>

    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
        !-- Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library --
        <li class="nav-item menu-open">
          <a href="#" class="nav-link active">
            <i class="nav-icon fas fa-tachometer-alt"></i>
            <p>
              Starter Pages
              <i class="right fas fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link active">
                <i class="far fa-circle nav-icon"></i>
                <p>Active Page</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Inactive Page</p>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-th"></i>
            <p>
              Simple Link
              <span class="right badge badge-danger">New</span>
            </p>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</aside>
    </>
  );
};

export default Try;
