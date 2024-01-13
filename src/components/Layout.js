import React, { useEffect, useState } from "react";
import DateTimeDisplay from "../custom/DateTimeDisplay";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [userTypeId, setUserTypeId] = useState(sessionStorage.getItem("UserTypeId"));

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7182/Logout/" + userId);
      //console.log(res);
      if (res.status === 200) {
        sessionStorage.removeItem("Username");
        sessionStorage.removeItem("UserId");
        sessionStorage.removeItem("UserTypeId");
        setUsername("");
        setUserId(0);
        setUserTypeId(0);
        navigate("/");
      }
    } catch (error) {}
  };

  useEffect(() => {
    //console.log(sessionStorage.getItem("UserTypeId"));
    console.log(userTypeId);
    setUsername(sessionStorage.getItem("Username"));
    setUserId(sessionStorage.getItem("UserId"));
    setUserTypeId(sessionStorage.getItem("UserTypeId"));
  }, []);

  return (
    <div>
      {/* Header */}

      <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href=""
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link text-bold text-blink">
              <DateTimeDisplay />
            </a>
          </li>
        </ul>
      </nav>
      {/* SideBar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">POS</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a className="d-block">{username}</a>
            </div>
          </div>
          <nav className="mt-2">
            {userTypeId === "1"? (
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <a id="dashboard" href="/Dashboard" className="nav-link">
                    <i className="nav-icon fa fa-bar-chart" />
                    <p>Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a id="pos" href="/POS" className="nav-link">
                    <i className="nav-icon fa fa-shopping-cart" />
                    <p>POS</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a id="inventory" href="/Inv_Products" className="nav-link">
                    <i className="nav-icon fa fa-edit" />
                    <p>
                      Inventory
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a
                        id="product_inventory"
                        href="/Inv_Products"
                        className="nav-link"
                      >
                        <i className="fa fa-arrow-right nav-icon ml-2" />
                        <p>Products Inventory</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        id="sales_inventory"
                        href="/Inv_Sales"
                        className="nav-link"
                      >
                        <i className="fa fa-arrow-right nav-icon ml-2" />
                        <p>Sales Inventory</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a id="manage" href="/Products" className="nav-link">
                    <i className="nav-icon fa fa-folder-open-o" />
                    <p>
                      Manage
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a id="products" href="/Products" className="nav-link">
                        <i className="fa fa-arrow-right nav-icon ml-2" />
                        <p>Products</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a id="users" href="/Users" className="nav-link">
                        <i className="fa fa-arrow-right nav-icon ml-2" />
                        <p>Users</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    id="logout"
                    href="/"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    <i className="nav-icon fa fa-sign-out" />
                    <p>Log out</p>
                  </a>
                </li>
              </ul>
            ) : (
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <a id="pos" href="/POS" className="nav-link">
                    <i className="nav-icon fa fa-shopping-cart" />
                    <p>POS</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    id="logout"
                    href="/"
                    className="nav-link"
                    onClick={handleLogout}
                  >
                    <i className="nav-icon fa fa-sign-out" />
                    <p>Log out</p>
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </aside>
      <aside className="control-sidebar control-sidebar-dark"></aside>
      {/* Content */}
      <div className="content-wrapper">{children}</div>
      {/* <div className="content-wrapper"><Outlet/></div> */}
      {/* Footer */}
      <footer className="main-footer fixed-bottom bg-dark">
        <strong>
          Copyright © 2023{" "}
          <a href="https://www.facebook.com/arieljordz">Jordz Production</a>.{" "}
        </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0
        </div>
      </footer>
    </div>
  );
}

export default Layout;
