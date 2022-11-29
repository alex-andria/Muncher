import React, { useState, useEffect } from "react";
import style from "./Auth.css";

function SignIn({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPasswordConfirmation, setNewUserPasswordConfirmation] =
    useState("");
  const [errors, setErrors] = useState([]);

  //log-in submit
  function handleSignInSubmit(e) {
    e.preventDefault();

    const login = {
      username: username,
      password: password,
    };
    console.log(login);

    fetch("/api/login", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(login),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      console.log(data);
      if (data.ok) {
        onLogin(login.username);
      }else{
        data.json().then((err) => {
          console.log(err.error);
          setErrors(err.error);
        });
      } 
    });
  }

  //sign-up submit
  function handleSignUpSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: newUserUsername,
      password: newUserPassword,
      password_confirmation: newUserPasswordConfirmation,
    };
    console.log(newUser);

    fetch("/api/user", {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(newUser),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      console.log(data);
      if (data.ok) {
        onLogin(newUser.username);
      }else{
        data.json().then((err) => {
          console.log(err.error);
          setErrors(err.error);
        });
      } 
    });

  }

  return (
    <>
      <div className="login-wrap">
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            defaultChecked
          />
          <label htmlFor="tab-1" className="tab">
            Sign In
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label htmlFor="tab-2" className="tab">
            Sign Up
          </label>
          <div className="login-form">

            {/* log-in form */}
            <form onSubmit={handleSignInSubmit}>
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username
                  </label>
                  <input
                    id="user"
                    type="text"
                    className="input"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="group">
                  <input id="check" type="checkbox" className="check" checked />
                  <label htmlFor="check">
                    <span className="icon"></span> Keep me Signed in
                  </label>
                </div> */}
                <div className="group">
                  <input type="submit" className="button" value="Sign In" />
                </div>
                <div className="hr"></div>
                {/* <div className="foot-lnk">
                  <a href="#forgot">Forgot Password?</a>
                </div> */}
              </div>
            </form>

            {/* sign-up form */}
            <form onSubmit={handleSignUpSubmit}>
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username
                  </label>
                  <input
                    id="user"
                    type="text"
                    className="input"
                    onChange={(e) => setNewUserUsername(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                    onChange={(e) => setNewUserPassword(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Repeat Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                    onChange={(e) =>
                      setNewUserPasswordConfirmation(e.target.value)
                    }
                  />
                </div>
                {/* ***** Email Address ***** */}
                {/* <div className="group">
                  <label htmlFor="pass" className="label">
                    Email Address
                  </label>
                  <input id="pass" type="text" className="input" />
                </div> */}
                <div className="group">
                  <input type="submit" className="button" value="Sign Up" />
                </div>
                <h3>{errors}</h3>
                <div className="hr"></div>
                <div className="foot-lnk">
                  <label htmlFor="tab-1">Already Member?</label>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
