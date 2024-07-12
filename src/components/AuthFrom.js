import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import classes from "./AuthFrom.module.css";
function AuthForm(props) {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const dataSubmit = Object.fromEntries(fd.entries());
    console.log(dataSubmit);
    try {
      const url = process.env.REACT_APP_API_URL + "auth/login-admin";
    } catch (err) {
      console.log(err);
    }

    // submit sign in
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <form className={classes.authForm} onSubmit={handleSubmit}>
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
          {msg && <p className={classes.authMsg}>{msg}</p>}
        </form>
      </div>
    </>
  );
}

export default AuthForm;
