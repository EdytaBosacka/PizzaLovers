import React, { useState } from 'react';
import Axios from 'axios';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import logo from './pizza-lovers-logo.png';
import loginImage from './login-image.png';
import './App.css';
import 'antd/dist/antd.css';
import { createStore, StateMachineProvider } from 'little-state-machine';

function App() {

  createStore({});
  const [loginState, setLoginState] = useState(0);
  const [registerState, setRegisterState] = useState(0);
  const login = (loginData: { login: string, password: string }) => {
    Axios.post('http://localhost:3001/login/', {
      login: loginData.login,
      password: loginData.password
    }).then((response) =>{
      setLoginState(response.status);
      console.log(response);
    }).catch(function(error){
      if (error.response) {
        setLoginState(error.response.status);
      }
    });
  }

  const registerForm = (registerData: {[x:string]: any}) => {
    Axios.post('http://localhost:3001/register/', {
      login: registerData.login,
      password: registerData.password,
      name: registerData.name,
      dateOfBirth: registerData.dateOfBirth,
      gender: registerData.gender.value,
      localication: registerData.localization
    }).then((response) =>{
      setRegisterState(response.status);
      console.log(response);
    }).catch(function(error){
      if (error.response) {
        setRegisterState(error.response.status);
      }
    });

  } 

  const createAnotherUser = () => {
    setRegisterState(0);
}
  return (
    <StateMachineProvider>
    <div className="App">
      <header className="App-header">
        <img className="Logo" src={logo} alt="Logo" />
      </header>
      <body>
        <div className= "MainPanel">
          <div className= "SidePanel">
            <h2> Find PizzaLovers from your neighborhood </h2>
            <LoginForm login={login}/>
            <div className= "LoginMessage">
              {loginState === 200 && <h2> OK </h2>} 
              {loginState === 401 && <h3> Password or login is invalid.</h3>} 
            </div>
            <img className="loginImage" src={loginImage} alt="Logo" />

          </div>
          <div className= "SidePanel">
            <h2> Register </h2>
            <RegisterForm registerForm={registerForm} registerState = {registerState}/>
            {registerState === 200 &&
            <button onClick={createAnotherUser} type="button"> Create another user </button>
            }
            <div className= "LoginMessage">
              {registerState === 409 && <h3> Username already exists.</h3>} 
            </div>

          </div>
        </div>
      </body>
    </div>
    </StateMachineProvider>
  );
}

export default App;
