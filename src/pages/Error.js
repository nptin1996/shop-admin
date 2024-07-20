import { useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
function Error() {
  const error = useRouteError();
  let message;
  if (error.status === 222) message = error.data.message;
  if (error.status === 404) message = "Page Not Found!";
  message = "Something wrong.";
  return (
    <>
      <NavBar />
      <div className="container bg-body min-height">
        <h1 style={{ textAlign: "center", verticalAlign: "middle" }}>
          {message}
        </h1>
      </div>
    </>
  );
}

export default Error;
