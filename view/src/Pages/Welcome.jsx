import React, { useEffect } from "react";
import "../Styles/welcome.css";
import welcomeSvg from "../Images/undraw_to_do_re_jaef.svg";
import Login from "../Components/Login";
import Register from "../Components/Register";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { APIURL } from "../config";
function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await fetch(`${APIURL}/api/auth`);
      const user = await result.json();
      return user;
    };
    fetchUser().then((result) => {
      if (!result.message) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className='welcome'>
      <div className='left'>
        <img src={welcomeSvg} alt='welcome' />
      </div>
      <div className='right'>
        <Outlet />
      </div>
    </div>
  );
}

export default Welcome;
