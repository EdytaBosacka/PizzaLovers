import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './MainPage.css';

import * as Constants from '../shared/constants/Constants';
import * as API from '../services/http/UserServices';

function MainPage() {
    const [usersList, setUsersList] = useState<{ 0: String, 1: { name: String, dateOfBirth: string, gender: String, localization: String } }[]>([]);
    const [userPhotos, setUserPhotos] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState(0);

    const swiperButtonStyle = {
        color: "#e9692c", background: "white", boxShadow: 0,
        "&:hover":
            { border: "1px solid #c6531e", color: '#c6531e', backgroundColor: '#ffe593' },
        "&:disabled":
            { color: "white", background: "white" }
    }

    const actionButtonStyle = {
        width: '80px', height: '80px',
        background: "white",
        "&:hover":
            { transform: "scale(1.08)" },
        "&:hover .match":
            { color: '#28a745' },
        "&:hover .unmatch":
            { color: '#dc3545' },
        "&:disabled":
            { color: "white", background: "white" }
    }

    const getUsers = async () => {
        await API.getUsers().then((response) => {
            setUsersList(response.data);
            console.log(response.data);
        }).catch(function (error) { });
    }

    const getUserPhotos = () => {
        if (usersList.length > 0) {
            API.getImages(usersList[0][0])
                .then((response) => {
                    console.log(response.data);
                    setUserPhotos(response.data);
                }).catch(function (error) { });
        }
    }

    const calculateUserAge = (): Number => {
        const timeDifference = new Date().getTime() - new Date(usersList[0][1].dateOfBirth).getTime();
        return Math.abs(new Date(timeDifference).getUTCFullYear() - 1970);
    }
    const nextPhoto = () => {
        setCurrentPhoto(currentPhoto + 1);
    }
    const previousPhoto = () => {
        setCurrentPhoto(currentPhoto - 1);
    }
    const isLastPhoto = (): boolean => {
        return userPhotos.length - 1 <= currentPhoto;
    }
    const isFirstPhoto = (): boolean => {
        return currentPhoto <= 0;
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
                    <Fab disabled={isFirstPhoto()} onClick={previousPhoto}
                        sx={swiperButtonStyle}>
                        <ArrowBackIosNewOutlinedIcon />
                    </Fab>
                    <div className="photoContainer">
                        <img src={userPhotos[currentPhoto]} className="photo"></img>
                        <Box className="actionButtonPanel" >
                            <Fab sx={actionButtonStyle}>
                                <FavoriteIcon className="match" color='primary' sx={{ fontSize: '30px' }} />
                            </Fab>
                            <Fab sx={actionButtonStyle}>
                                <CloseIcon className="unmatch" color='primary' sx={{ fontSize: '30px' }} />
                            </Fab>
                        </Box>
                    </div>
                    <Fab disabled={isLastPhoto()} onClick={nextPhoto}
                        sx={swiperButtonStyle}>
                        <ArrowForwardIosOutlinedIcon />
                    </Fab>
                </div>
                <div className="userDetails">
                    <h1 className="b">{!!usersList[0] && usersList[0][1].name + "," + calculateUserAge()}</h1>

                </div>
            </div>
        </div>

    );
}


export default MainPage;