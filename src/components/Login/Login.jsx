import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(location);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError("");
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const message = error.message;
        console.log(message);
        setError(message);
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <p className="error">{error}</p>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type={show ? "text" : "password"} name="password" required />
          <p onClick={() => setShow(!show)}>
            <small>
              {show ? <span>hide Password</span> : <span>Show Password</span>}
            </small>
          </p>
        </div>
        <input className="submit-btn" type="submit" value="Login" />
      </form>
      <p className="already">
        <small>
          New to ema-jon ? <Link to="/sign-up">Sign up</Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
