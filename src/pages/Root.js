import NavBar from "../components/NavBar";
import { Outlet, redirect } from "react-router-dom";
import { getLocalStorageUser } from "../function";

function Root() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}

export default Root;

export function loader() {
  const user = getLocalStorageUser();
  if (!user) return redirect("/login");
  return null;
}
