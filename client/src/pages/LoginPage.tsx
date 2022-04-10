import React, { useState } from 'react';
import Axios from 'axios';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Header from '../header.png';
import { useHistory } from "react-router-dom";
import loginImage from '../login-image.png';

function LoginPage() {
  let history = useHistory();
  const routeChange = (loggedUser: String) => {
    let path = '/home';
    history.push(path, { login: loggedUser });
  }

  const [loginState, setLoginState] = useState(0);
  const [registerState, setRegisterState] = useState(0);
  const login = (loginData: { [x: string]: any }) => {
    Axios.post('http://localhost:3001/login/', {
      login: loginData.login,
      password: loginData.password
    }).then((response) => {
      setLoginState(response.status);
      if (response.status === 200) {
        routeChange(loginData.login);
      }
      console.log(response);
    }).catch(function (error) {
      if (error.response) {
        setLoginState(error.response.status);
      }
    });
  }

  const registerForm = (registerData: { [x: string]: any }) => {
    Axios.post('http://localhost:3001/register/', {
      login: registerData.login,
      password: registerData.password,
      name: registerData.name,
      dateOfBirth: registerData.dateOfBirth,
      gender: registerData.gender.value,
      localization: registerData.localization
    }).then((response) => {
      setRegisterState(response.status);
      console.log(response);
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
          <h2> Find PizzaLovers from your neighborhood </h2>
          <LoginForm login={login} />
          <div className="LoginMessage">
            {loginState === 401 && <h3> Password or login is invalid.</h3>}
          </div>
          <img className="loginImage" src={loginImage} alt="Logo" />

        </div>
        <div className="SidePanel">
          <h2> Register </h2>
          <RegisterForm registerForm={registerForm} registerState={registerState} />
          {registerState === 200 &&
            <button onClick={createAnotherUser} type="button"> Create another user </button>
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

        


      </div>

    </div>
  );
}

export default LoginPage;
