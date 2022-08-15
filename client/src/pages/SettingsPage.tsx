import SideBar from '../components/SideBar';
import ImageUpload from '../components/ImageUpload';
import UserInformationSection from '../components/UserInformationSection';
import './SettingsPage.css';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../../node_modules/@mui/material/Button';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function SettingsPage() {

    const [userImages, setUserImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const carouselSize = 6;

    const uploadImages = (images: (String | ArrayBuffer)[]) => {
        images.forEach((image) => {
            Axios.post('http://localhost:3001/uploadImage/', {
                loggedUser: localStorage.getItem('login'),
                image: image
            }).then((response) => {
                getImages();
            }).catch(function (error) {

            });
        })

    }
    const getImages = () => {
        Axios.post('http://localhost:3001/getImages', {
            loggedUser: localStorage.getItem('login'),
        }).then((response) => {
            if (response.data) {
                setUserImages(response.data);
            }
        }).catch(function (error) {

        });
    }

    const displayNextImages = () => {
        if (currentImageIndex < (userImages.length - carouselSize)) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    const displayPreviousImages = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }

    useEffect(() => {
        getImages();
    }, [])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <div className="MainPage">
            <SideBar />
            <div className="userSettings">
                <div className="imagesCollection">
                    <ImageUpload uploadImages={uploadImages} />
                    <Button onClick={displayPreviousImages}><ArrowBackIosNewOutlinedIcon /></Button>
                    {userImages?.map(function (image, i) {
                        if (i >= currentImageIndex && i < currentImageIndex + carouselSize) {
                            return <img key={i} src={image} className="image"></img>;
                        }
                    })}
                    <Button onClick={displayNextImages}>< ArrowForwardIosOutlinedIcon /></Button>
                </div>
                <div className="settingsSection">
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="User Information" />
                        <Tab label="Work And Education" />
                        <Tab label="Interests" />
                    </Tabs>
                </div>
                <div>
                        {tabValue === 0 && (
                            <UserInformationSection/>
                        )}
                </div>

            </div>
        </div>

    );
}


export default SettingsPage;