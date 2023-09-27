import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '../../node_modules/@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolIcon from '@mui/icons-material/School';
import Autocomplete from '@mui/material/Autocomplete';
import * as API from '../services/http/UserServices';
import * as ExternalAPI from '../services/http/ExternalServices';
import './WorkAndEducationSection.css';


function WorkAndEducationSection() {

    const [workPlace, setWorkPlace] = useState('');
    const oldWorkPlace = useRef('');
    const [occupation, setOccupation] = useState('');
    const oldOccupation = useRef('');
    const [university, setUniversity] = useState('');
    const oldUniversity = useRef('');
    const [languagesList, setLanguagesList] = useState([] as string[]);
    const [selectedLanguages, setSelectedLanguages] = useState([] as string[]);
    const oldSelectedLanguages = useRef([] as { code: string, name: string, targets: string[] }[]);
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

    const getLanguages = () => {
        ExternalAPI.getListOfLanguages()
            .then((response) => {
                let languages = (response.data as any[]).map(language => language.name);
                setLanguagesList(languages);
            })
    }

    const getUserWorkEducationDetails = () => {
        API.getUserDetails().then(response => {
            if (response.data) {
                oldWorkPlace.current = response.data.workPlace;
                oldOccupation.current = response.data.occupation;
                oldUniversity.current = response.data.university;
                oldSelectedLanguages.current = response.data.languages;

                setWorkPlace(response.data.workPlace);
                setOccupation(response.data.occupation);
                setUniversity(response.data.university);
                setSelectedLanguages(response.data.languages);
            }
        }).catch(function (error) { });
    }
    const saveUserWorkAndEducation = () => {
        API.saveUserWorkAndEducation({ workPlace: workPlace, occupation: occupation, university: university, languages: selectedLanguages })
            .then((response) => {
                setWorkAndEducationStatus(response.status);
            }).catch(function (error) { });
    }

    useEffect(() => {
        getLanguages();
        getUserWorkEducationDetails();
    }, []);


    return (
        <div className="workAndEducationSection">
            <div className="workAndEducationInformation">
                <div className="singleSection">
                    <h3 className="sectionTitle">Work</h3>
                    <TextField
                        label="Work Place"
                        value={workPlace}
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
                        value={occupation}
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
                        value={university}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SchoolIcon />
                                </InputAdornment>
                            )
                        }}
                        margin="normal" size="small" autoComplete="off" onChange={onChangeUniversity} sx={{ width: '100%' }} />
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="singleSection">
                    <h3 className="sectionTitle">Languages</h3>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        value={selectedLanguages}
                        options={languagesList}
                        onChange={(event, value) => setSelectedLanguages(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder="Languages"
                            />
                        )}
                    />
                </div>
            </div>
            <div>
                <Button variant="outlined" startIcon={<SaveAsOutlinedIcon />} onClick={saveUserWorkAndEducation} type="submit" sx={{ marginTop: '50px', width: '20%' }}>Save</Button>
            </div>
        </div>
    );



}


export default WorkAndEducationSection;