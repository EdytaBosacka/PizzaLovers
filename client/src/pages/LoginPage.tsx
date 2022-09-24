import React, { useState } from 'react';
import Axios from 'axios';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Header from '../header.png';
import { useNavigate } from "react-router-dom";
import loginImage from '../login-image.png';
import Button from '../../node_modules/@mui/material/Button';

import * as API from '../services/http/UserServices';

function LoginPage() {
  let navigate = useNavigate();
  const routeChange = (loggedUser: string) => {
    let path = '/home';
    localStorage.setItem('login', loggedUser);
    navigate(path);
  }

  const [loginState, setLoginState] = useState(0);
  const [registerState, setRegisterState] = useState(0);

  const login = (loginData: { [x: string]: any }) => {
    API.login(loginData).then((response) => {
      setLoginState(response.status);
      if (response.status === 200) {
        routeChange(loginData.login);
      }
    }).catch(function (error) {
      if (error.response) {
        setLoginState(error.response.status);
      }
    });
  }

  const registerForm = (registerData: { [x: string]: any }) => {
    API.register(registerData).then((response) => {
      setRegisterState(response.status);
    }).catch(function (error) {
      if (error.response) {
        setRegisterState(error.response.status);
      }
    });
  }

  const createAnotherUser = () => {
    setRegisterState(0);
  }
  return (
    <div>
      <div className="App-header">
        <img className="Logo" src={Header} alt="Logo" />
      </div>

      <div className="MainPanel">
        <div className="SidePanel">
          <h2 className="SidePanelTitle"> Find PizzaLovers from your neighborhood </h2>
          <LoginForm login={login} />
          <div className="LoginMessage">
            {loginState === 401 && <h3> Password or login is invalid.</h3>}
          </div>
          <img className="loginImage" src={loginImage} alt="Logo" />

        </div>
        <div className="SidePanel">
          <h2 className="SidePanelTitle"> Register </h2>
          <RegisterForm registerForm={registerForm} registerState={registerState} />
          {registerState === 200 &&
            <Button variant="outlined" onClick={createAnotherUser}> Create another user </Button>
          }
          <div className="LoginMessage">
            {registerState === 409 && <h3> Username already exists.</h3>}
          </div>

        </div>
      </div>
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

    </div>
  );
}

export default LoginPage;
