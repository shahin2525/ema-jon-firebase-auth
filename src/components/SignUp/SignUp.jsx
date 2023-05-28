import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    // event.reset();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(email, password, confirm);
    setError("");
    if (password !== confirm) {
      setError("password is not match with confirm password");
      return;
    } else if (password.length < 6) {
      setError("Password length will be minimum 6 character");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const message = error.message;
        console.log(message);
        setError(message);
      });
  };
  return (
    <div className="form-container">
      <h2 className="form-title">Sign-up</h2>
      <p className="error">{error}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-control">
          <label id="confirm-password-label" htmlFor="password">
            Confirm-password
          </label>
          <input type="password" name="confirm" required />
        </div>
        <input className="submit-btn" type="submit" value="Sign-up" />
      </form>
      <p>
        <small>
          Al ready have an account ? <Link to="/login">LogIn</Link>
        </small>
      </p>
    </div>
  );
};

export default SignUp;
