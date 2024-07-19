import { useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <NavBar />
      <div>Not Found</div>
    </>
  );
}

export default Error;
