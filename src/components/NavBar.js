import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <h2>
        <NavLink>ADMIN SHOP</NavLink>
      </h2>
      <ul>
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink>Products</NavLink>
        </li>
        <li>
          <NavLink>Chats</NavLink>
        </li>
        <li>
          <NavLink>Login</NavLink>
        </li>
        <li>
          <NavLink>Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
