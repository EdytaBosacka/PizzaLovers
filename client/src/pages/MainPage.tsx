import React, { useState } from 'react';
import Axios from 'axios';
import { useLocation } from "react-router-dom";
import SideBar from '../components/SideBar';
import './MainPage.css';

function MainPage() {
    const [usersState, setUsersState] = useState();
    const location = useLocation<{ login: string }>();
    console.log(location);
    const getUsers = () => {
        Axios.post('http://localhost:3001/getUsers/', {
          loggedUser: location.state.login
        }).then((response) =>{
            setUsersState(response.data);
            console.log(usersState);
        }).catch(function(error){
          
        });
      }
    getUsers();
    
    return(
        <div className="MainPage">
        <SideBar/>
        <div className="usersSwiper"> 
        <button onClick={getUsers}>ewew</button>
        </div>
        </div>
        
    );
}


export default MainPage;