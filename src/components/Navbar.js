import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login');
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">iNotebook</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            {/* <li class="nav-item">
              <Link class={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li> */}
            {/* <li class="nav-item dropdown">
          <Link class="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/">Action</Link></li>
            <li><Link class="dropdown-item" to="/">Another action</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><Link class="dropdown-item" to="/">Something else here</Link></li>
          </ul>
        </li>
        <li class="nav-item">
          <Link class="nav-link disabled">Disabled</Link>
        </li> */}
          </ul>
          {/* <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
          {!localStorage.getItem('token') ?
            <div className="d-flex">
              <Link class="btn btn-primary mx-2" role="button" to='/login'>Login</Link>
              <Link class="btn btn-primary mx-2" role="button" to='/signup'>Signup</Link></div> : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
