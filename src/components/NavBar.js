// import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
function NavBar() {
  return (
    <div className={classes.navContainer}>
      <nav className={`container ${classes.navbar}`}>
        <h2>ADMIN SHOP</h2>
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Product</a>
          </li>
          <li>
            <a>Chat</a>
          </li>
          <li>
            <a>Login</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
