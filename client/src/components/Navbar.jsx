import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ReactTooltip from "react-tooltip";
import logo from "../components/svg/logo.png";
function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <nav>
          {user && (
            <div style={{ display: "flex" }}>
              <div className="user" data-tip data-for="global">
                <span> {user?.email.split("@")[0][0]}</span>
                <ReactTooltip
                  place="bottom"
                  id="global"
                  type="dark"
                  effect="float"
                >
                  <p>{user?.email}</p>
                </ReactTooltip>
              </div>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className="signinup">
              <Link to="/login">Login</Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
