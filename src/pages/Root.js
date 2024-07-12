import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Root;
