import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Auth.css";

import logo from "../../../img/logo.png";
import logo2 from "../../../img/Group 8.png";
import { logIn, signUp } from "../../../Actions/AuthActions";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authReducers.loading)
  const [isSignUp, setisSignup] = useState(true);

  console.log(loading)



  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [confirmPass, setconfirmPass] = useState(true);

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setconfirmPass(false);
    }else{
      dispatch(logIn(data))
    }
  };

  const resetForm = () => {
    setconfirmPass(true);

    setdata({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
    });
  };

  return (
    <div className="auth">
      <div className="a-left">
        <img src={logo2} alt="" />

        <div className="webname">
          <h1 style={{color:"#D05185", fontSize:"3rem"}}>InstaInspire</h1>
          <h6>Explore the idea throughout the world </h6>
        </div>
      </div>
      {/*Right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handelSubmit}>
          <h2 className="signup-login">{isSignUp ? "Sign Up" : "Login"}</h2>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="@username"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />

            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpassword"
                placeholder="confirm password"
                onChange={handleChange}
                value={data.setconfirmPass}
              />
            )}
          </div>

          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * confirm password is not same
          </span>

          <div>
            <span
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={() => {
                setisSignup((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login"
                : "Don't have account? SignUp"}
            </span>
          </div>

          <button className="button infoBtn" type="submit" disabled={loading}>
            {loading? "Loading..." : isSignUp ? "SignUp" : "Login"}
          </button>
        </form>
      </div>{" "}
    </div>
  );
};



export default Auth;
