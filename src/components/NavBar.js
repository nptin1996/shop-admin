import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
function NavBar() {
  return (
    <div className={classes.navContainer}>
      <nav className={`container ${classes.navbar}`}>
        <h2>ADMIN SHOP</h2>
        <ul>
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink>Product</NavLink>
          </li>
          <li>
            <NavLink>Chat</NavLink>
          </li>
          <li>
            <NavLink>Login</NavLink>
          </li>
          <li>
            <NavLink>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
