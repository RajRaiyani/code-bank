import React, { useState } from "react";
import "./sideNavBar.css";
import { faList, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideNavBar = () => {
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
      <div style={{ backgroundColor: " #DFE5EF" }}>
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
      </div>
    </>
  );
};

export default SideNavBar;
