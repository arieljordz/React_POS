import React from 'react'

function Header() {
  return (
    <>
    <div className="preloader flex-column justify-content-center align-items-center">
        <img className="animation__wobble" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
    </div>
    <nav className="main-header navbar navbar-expand navbar-dark">
        <ul className="navbar-nav">
        <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="" role="button"><i className="fas fa-bars" /></a>
        </li>
        
        </ul>
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <a className="nav-link text-bold text-blink">asdsadsad
        </a>
        </li>
        </ul>
    </nav>
    </>

    
  )
}

export default Header
