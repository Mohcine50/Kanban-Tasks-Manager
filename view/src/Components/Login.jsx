import React, { useEffect, useState } from "react";
import "../Styles/login.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { APIURL } from "../config";

function Login() {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [token, setToken] = useState();

  const navigate = useNavigate();

  const login = async (email, password) => {
    const result = await fetch(`${APIURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await result.json();

    return data;
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.token) {
      console.log(data.token);
      navigate("/");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className='login'>
      <h1>Welcome Back</h1>
      <form onSubmit={handelLogin}>
        <input
          type='text'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='E-mail'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Password'
        />
        <button type='submit'>LOGIN</button>
      </form>
      <h1 className='login-h1'>
        You don't have an Account{" "}
        <span>
          <Link
            to='/register'
            style={{ color: "#635fc3", textDecoration: "none" }}
          >
            Register
          </Link>
        </span>
      </h1>
    </div>
  );
}

export default Login;
