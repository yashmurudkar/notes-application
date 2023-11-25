import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () =>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              iNotes
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
              </ul>
              {!localStorage.getItem("token") ? (
                <form className="d-flex" role="search">
                  <Link className="btn btn-primary mx-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-primary" to="/signup">
                    Sign Up
                  </Link>
                </form>
              ) : (
                <form className="d-flex" role="search">
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                  </button>
                </form>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
}

export default Navbar
