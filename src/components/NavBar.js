import { useContext } from "react";
import { Context } from "../store/context";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./NavBar.module.css";
function NavBar() {
  const { user, logout } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        logout();
        return navigate("/login");
      }
      throw new Error();
    } catch (err) {
      console.log(err);
      alert("Logout failed!");
    }
  };
  return (
    <div className={classes.navContainer}>
      <nav className={`container ${classes.navbar}`}>
        <h2>ADMIN SHOP</h2>
        <ul>
          {user && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {user && user.type === "admin" && (
            <li>
              <NavLink
                to="/product"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Product
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                to="/chat"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Chat
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Login
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <button className="btn" onClick={handleLogout}>
                {user.name} (Logout)
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
