import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import classes from "./AuthFrom.module.css";
function AuthForm(props) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = fd.get("email");
    const password = fd.get("password");

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
          {/* <p className={classes.authMsg}>message</p> */}
        </form>
      </div>
    </>
  );
}

export default AuthForm;
