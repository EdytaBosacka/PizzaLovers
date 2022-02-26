import React, { useState } from 'react';
import Axios from 'axios';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import logo from './pizza-lovers-logo.png';
import loginImage from './login-image.png';
import './App.css';

function App() {
  const [loginState, setLoginState] = useState(0);
  const login = (loginData: { login: string, password: string }) => {
    Axios.post('http://localhost:3001/login/', {
      userName: loginData.login,
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
  return (
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
            <RegisterForm login={login}/>

          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
