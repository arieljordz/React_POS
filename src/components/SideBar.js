import React, { useState } from 'react';

function SideBar() {
  const [isActive, setIsActive] = useState(true);

  const handleClick = () => {
    setIsActive(false);
  };

  return (
  <>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a className="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">POS</span>
    </a>
    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a className="d-block">John S. Doe</a>
        </div>
      </div>
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item menu-open">
            <a href="" className="nav-link active">
              <i className="nav-icon fa fa-group" />
              <p>
                Manage
                <i className="right fas fa-angle-left" />
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a id="products" href="" className="nav-link active">
                  <i className="fa fa-arrow-right nav-icon ml-2" />
                  <p>Products</p>
                </a>
              </li>
              <li className="nav-item">
                <a id="quantity" href="" className={"nav-link ${isActive ? 'active' : ''}"} onClick={handleClick}>
                  <i className="fa fa-arrow-right nav-icon ml-2" />
                  <p>Quantitys</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
  <aside className="control-sidebar control-sidebar-dark">
  </aside>
  </>

  )
}

export default SideBar
