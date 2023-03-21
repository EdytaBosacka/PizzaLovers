import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '../../node_modules/@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolIcon from '@mui/icons-material/School';

import * as API from '../services/http/UserServices';
import './WorkAndEducationSection.css';


function WorkAndEducationSection() {

    const [workPlace, setWorkPlace] = useState('');
    const [occupation, setOccupation] = useState('');
    const [university, setUniversity] = useState('');
    const [saveWorkAndEducationStatus, setWorkAndEducationStatus] = useState(0);

    const onChangeWorkPlace = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setWorkPlace(event.target.value);
    }
    const onChangeOccupation = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setOccupation(event.target.value);
    }
    const onChangeUniversity = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setUniversity(event.target.value);
    }
    const saveUserWorkAndEducation = () => {
        API.saveUserWorkAndEducation({ workPlace: workPlace, occupation: occupation, university: university })
        .then((response) => {
            setWorkAndEducationStatus(response.status);
        }).catch(function (error) { });
    }


    return (
        <div className="workAndEducationSection">
            <div className="workAndEducationInformation">
                <div className="singleSection">
                    <h3 className="sectionTitle">Work</h3>
                    <TextField
                        label="Work Place"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ApartmentIcon />
                                </InputAdornment>
                            )
                        }}
                        margin="normal" size="small" autoComplete="off" onChange={onChangeWorkPlace} sx={{ width: '100%' }} />
                    <TextField
                        label="Occupation"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <WorkOutlineIcon />
                                </InputAdornment>
                            )
                        }}
                        margin="normal" size="small" autoComplete="off" onChange={onChangeOccupation} sx={{ width: '100%' }} />
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="singleSection">
                    <h3 className="sectionTitle">Education</h3>
                    <TextField
                        label="University"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SchoolIcon />
                                </InputAdornment>
                            )
                        }}
                        margin="normal" size="small" autoComplete="off" onChange={onChangeUniversity} sx={{ width: '100%' }} />
                </div>
            </div>
            <div>
                <Button variant="outlined" startIcon={<SaveAsOutlinedIcon />} type="submit" sx={{ marginTop: '50px', width: '20%'}}>Save</Button>
            </div>
        </div>
    );



}


export default WorkAndEducationSection;