import { useEffect, useContext } from "react";
import { Context } from "../store/context";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
