import React from "react";

function NavBar({user, setUser}) {

  function handleLogOut() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <nav>
      <div>
        <a className="navbar-brand" href="/">
          Muncher
        </a>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleLogOut}>
          Log-out
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
