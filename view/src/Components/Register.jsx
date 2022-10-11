import React from "react";
import "../Styles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APIURL } from "../config";
function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const register = async (name, email, password) => {
    const result = await fetch(`${APIURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const data = await result.json();

    return data;
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = await register(name, email, password);
    if (!data.message) {
      navigate("/welcome");
    }
    setName("");
    setEmail("");
    setPassword("");

    if (data.message === "email already existed") {
      console.log(data.message);
      toast.error("Email already existed Please try a new one", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className='register'>
      <h1>Register a New Account</h1>
      <form onSubmit={handelSubmit}>
        <input
          type='text'
          value={name}
          placeholder='Full Name'
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type='text'
          value={email}
          placeholder='E-mail'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type='submit'>Register</button>
      </form>
      <h1 className='register-h1'>
        I have an account{" "}
        <span>
          <Link
            to='/welcome'
            style={{ color: "#635fc3", textDecoration: "none" }}
          >
            Login
          </Link>
        </span>
      </h1>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme='dark'
        pauseOnHover
        style={{ fontFamily: "Rubik, sans-serif" }}
      />
    </div>
  );
}

export default Register;
