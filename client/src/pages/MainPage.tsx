import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Box from '@mui/material/Box';
import Button from '../../node_modules/@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DefaultUserPhoto from '../images/DefaultUserPhoto.jpg';
import './MainPage.css';

import * as Constants from '../shared/constants/Constants';
import * as API from '../services/http/UserServices';

function MainPage() {
    const [usersList, setUsersList] = useState<{ 0: String, 1: { name: String, dateOfBirth: string, gender: String, localization: String } }[]>([]);
    const [userPhotos, setUserPhotos] = useState<string []>([]);
    const [loggedUserPhotos, setLoggedUserPhotos] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [dialogOpened, setDialogOpened] = useState(false);

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
        "&:disabled .match":
            { color: "gray" },
        "&:disabled .unmatch":
            { color: "gray" },
    }
    const continueButtonStyle = {
        marginTop: '20px', color: "#e9692c", background: "white", border: "1px solid #c6531e", opacity: '0.95',
        "&:hover":
            { border: "1px solid #c6531e", color: '#c6531e', backgroundColor: '#ffe593' }
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
                    if (!response.data) {
                        setUserPhotos([DefaultUserPhoto]);
                    } else {
                        setUserPhotos(response.data);
                    }

                }).catch(function (error) { });
        }
    }
    const getLoggedUserPhotos = () => {
        API.getImages(localStorage.getItem('login'))
            .then((response) => {
                setLoggedUserPhotos(response.data);
            }).catch(function (error) { });
    }

    const likeAction = () => {
        API.saveUserLike(usersList[0][0], true).then((response) => {
            if (response.data.match) {
                setDialogOpened(true);
            } else {
                usersList.shift();
                setUsersList([...usersList]);
                setCurrentPhoto(0);
            }
            console.log(response.data.match);
        }).catch(function (error) { });
    }

    const dislikeAction = () => {
        API.saveUserLike(usersList[0][0], false).then((response) => {
            usersList.shift();
            setUsersList([...usersList]);
            setCurrentPhoto(0);
        }).catch(function (error) { });
    }

    const continueAction = () => {
        setDialogOpened(false);
        usersList.shift();
        setUsersList([...usersList]);
        setCurrentPhoto(0);
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
    const isUsersListEmpty = (): boolean => {
        return usersList.length == 0;
    }

    useEffect(() => {
        getUsers();
        getLoggedUserPhotos();
    }, []);

    useEffect(() => {
        getUserPhotos()
    }, [usersList]);

    return (
        <div className="MainPage">
            <SideBar />
            <Dialog open={dialogOpened} style={{ opacity: '0.95' }}>
                <DialogTitle style={{
                    backgroundColor: '#ffac45', color: 'white', fontFamily: 'Dancing Script',
                    fontSize: '48px', textAlign: 'center'
                }}>
                    It's a Match!
                </DialogTitle>
                <DialogContent style={{
                    backgroundColor: '#ffac45', color: 'white', fontFamily: 'Century Gothic',
                    fontWeight: 'lighter', fontSize: '18px'
                }}>
                    <div className='itsaMatchContent'>
                        You and {!!usersList[0] ? usersList[0][1].name : ''} have liked each other!
                        <div>
                            <img src={loggedUserPhotos[0]} className="roundPhoto"></img>
                            <img src={userPhotos[currentPhoto]} className="roundPhoto"></img>
                        </div>
                        Now you can send {!!usersList[0] ? (usersList[0][1].gender == 'female' ? 'her' : (usersList[0][1].gender == 'male' ? 'him' : 'them')) : ''} a message.
                        <Button variant='outlined' onClick={continueAction} sx={continueButtonStyle}>Continue</Button>
                    </div>

                </DialogContent>
            </Dialog>
            {!isUsersListEmpty() &&
                <div className="usersSwiper">
                    <div className="userPhoto">
                        <Fab disabled={isFirstPhoto()} onClick={previousPhoto}
                            sx={swiperButtonStyle}>
                            <ArrowBackIosNewOutlinedIcon />
                        </Fab>
                        <div className="photoContainer">
                            <img src={userPhotos[currentPhoto]} className="photo"></img>
                            <Box className="actionButtonPanel" >
                                <Fab disabled={isUsersListEmpty()} onClick={likeAction} sx={actionButtonStyle}>
                                    <FavoriteIcon className="match" color='primary' sx={{ fontSize: '30px' }} />
                                </Fab>
                                <Fab disabled={isUsersListEmpty()} onClick={dislikeAction} sx={actionButtonStyle}>
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
            }
            {isUsersListEmpty() &&
                <div className="usersSwiper">
                    <div className="noMoreUsersFoundContainer">
                        <FavoriteBorderIcon color='primary' sx={{ fontSize: '18px' }} />
                        <h1 className="noMoreUsersFound"> <FavoriteBorderIcon color='primary' /> No more PizzaLovers were found at the moment. <FavoriteBorderIcon color='primary' /></h1>
                        <FavoriteBorderIcon color='primary' sx={{ fontSize: '18px' }} />
                    </div>
                </div>
            }

        </div>

    );
}


export default MainPage;