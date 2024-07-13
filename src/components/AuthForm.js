import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/context";
import NavBar from "./NavBar";
import classes from "./AuthForm.module.css";
function AuthForm(props) {
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
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login?mode=admin`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify(dataSubmit),
        }
      );
      const dataRes = await res.json();
      console.log(dataRes);
      if (res.ok) {
        login(dataRes);
        return navigate("/");
      }
      if (dataRes.message) {
        setLoading(false);
        return setMsg(dataRes.message);
      }
      throw new Error();
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMsg("Login Failed!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <form className={classes.authForm} onSubmit={handleSubmit}>
          {loading && <div class={classes.loader}></div>}
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
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default AuthForm;
