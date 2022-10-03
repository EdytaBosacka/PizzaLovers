import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import SideBar from '../components/SideBar';
import './MainPage.css';
import * as API from '../services/http/UserServices';

function MainPage() {
    const [usersList, setUsersList] = useState<{0: String, 1: Object}[]>([]);
    const [userPhotos,setUserPhotos] = useState([]);

    const getUsers = async () => {
        await API.getUsers().then((response) => {
            setUsersList(response.data);
            console.log(response.data);
        }).catch(function (error) { });
    }

    const getUserPhotos = () => {
        if(usersList.length > 0){
            API.getImages(usersList[0][0])
            .then((response) => {
                console.log(response.data);
                setUserPhotos(response.data);
            }).catch(function(error) {});
        }

    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUserPhotos()
    }, [usersList]);

    return (
        <div className="MainPage">
            <SideBar />
            <div className="usersSwiper">
                <div className="userPhoto">
                </div>
                <div className="userDetails">
                    <input type="button" onClick={getUserPhotos}/>
                    <img src={userPhotos[0]} className="image"></img>;

                </div>
            </div>
        </div>

    );
}


export default MainPage;