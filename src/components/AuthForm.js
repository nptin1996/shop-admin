import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/context";
import NavBar from "./NavBar";
import classes from "./AuthForm.module.css";
import { fetchData } from "../function";
function AuthForm() {
  const { login } = useContext(Context);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    const fd = new FormData(e.target);
    const dataSubmit = Object.fromEntries(fd.entries());
    console.log(dataSubmit);
    try {
      const res = await fetchData("auth/login?mode=admin", "POST", dataSubmit);
      const dataRes = await res.json();
      console.log(dataRes);
      if (res.ok) {
        login(dataRes);
        return navigate("/");
      }
      if (dataRes.message) {
        return setMsg(dataRes.message);
      }
      throw new Error();
    } catch (err) {
      console.log(err);
      setMsg("Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container bg-body min-height">
        <form className={`card ${classes.authForm}`} onSubmit={handleSubmit}>
          {loading && <div className={`loader ${classes.loader}`} />}
          {msg && <p className={classes.authMsg}>{msg}</p>}
          <h3>Login</h3>
          <ul>
            <li>
              <input placeholder="Email" type="email" name="email" required />
            </li>
            <li>
              <input
                placeholder="Password"
                type="password"
                name="password"
                minLength={6}
                required
              />
            </li>
          </ul>
          <button className="btn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AuthForm;
