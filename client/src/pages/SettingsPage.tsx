import Axios from 'axios';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Button from '../../node_modules/@mui/material/Button';
import ImageUpload from '../components/ImageUpload';
import React, { useState, useEffect, useRef } from 'react';
import SideBar from '../components/SideBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserInformationSection from '../components/UserInformationSection';

import * as API from '../services/http/UserServices';
import './SettingsPage.css';

function SettingsPage() {

    const [userImages, setUserImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [tabValue, setTabValue] = useState(0);
    const carouselSize = 6;

    const uploadImages = (images: (String | ArrayBuffer)[]) => {
        images.forEach((image) => {
            API.uploadImage(image).then((response) => {
                getImages();
            }).catch(function (error) { });
        })
    }
    const getImages = () => {
        API.getImages(localStorage.getItem('login')).then((response) => {
            if (response.data) {
                setUserImages(response.data);
            }
        }).catch(function (error) { });
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
                        <UserInformationSection />
                    )}
                </div>

            </div>
        </div>

    );
}


export default SettingsPage;