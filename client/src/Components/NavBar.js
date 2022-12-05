import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar({ user, setUser }) {
  
  function handleLogOut() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Muncher
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <button className="btn btn-primary" onClick={handleLogOut}>
              Log-out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
