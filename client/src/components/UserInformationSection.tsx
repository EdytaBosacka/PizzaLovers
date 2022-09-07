import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '../../node_modules/@mui/material/Button';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';

import * as Constants from '../shared/constants/Constants';
import * as API from '../services/http/UserServices';
import './UserInformationSection.css';

function UserInformationSection() {

    const [passwordState, setPasswordState] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confPasswordState, setConfPasswordState] = useState('');
    const [confPasswordValue, setConfPasswordValue] = useState('');
    const [savePasswordStatus, setSavePasswordStatus] = useState(0);

    const [nameState, setNameState] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());
    const [gender, setGender] = useState('');
    const [localizationState, setLocalizationState] = useState('');
    const [localizationValue, setLocalizationValue] = useState('');

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(event.target.value);
        if (event.target.value.length >= 7 && event.target.value.length <= 20) {
            setPasswordState('');
        } else {
            setPasswordState('Password must have between 7 and 20 characters.');
        }
    }
    const onChangeConfPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfPasswordValue(event.target.value);
        if (event.target.value === passwordValue) {
            setConfPasswordState('');
        } else {
            setConfPasswordState('Passwords are not identical.');
        }
    }
    const savePassword = () => {
        API.savePassword(passwordValue).then((response) => {
            setSavePasswordStatus(response.status);
        }).catch(function (error) {});
    }    

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
        if (event.target.value.match(/^[A-Za-z]+$/i)) {
            setNameState('');
        } else {
            setNameState('Name contains invalid characters.');
        }
    }
    const onChangeDateOfBirth = (newValue: Date | null) => {
        setDateOfBirth(newValue);
    };
    const onChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    }
    const onChangeLocalization = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalizationValue(event.target.value);
        if (event.target.value.match(/^[A-Za-z]+$/i)) {
            setLocalizationState('');
        } else {
            setLocalizationState('Localization contains invalid characters.');
        }
    }
    const saveUserGeneralInformation = () => {
        API.saveUserDetails({ name: nameValue, dateOfBirth:  moment(dateOfBirth).format(Constants.DATE_FORMAT), gender: gender, localization: localizationValue }).then((response) => {
            setSavePasswordStatus(response.status);
        }).catch(function (error) {

        });
    }    
   

    return (
        <div className="userInformationSection">
            <div className="section">
                <h3 className="sectionTitle">Password</h3>
                <div className="password">
                    <TextField
                        label="Password" margin="normal" type="password" size="small" autoComplete="off" error={passwordState !== ""} helperText={passwordState} FormHelperTextProps={{ style: { overflow: 'hidden' } }} onChange={onChangePassword} sx={{ width: '100%' }} />
                </div>
                <div className="confirmedPassword">
                    <TextField
                        label="Confirmed Password" margin="normal" type="password" size="small" autoComplete="off" error={confPasswordState !== ""} helperText={confPasswordState} onChange={onChangeConfPassword} sx={{ width: '100%' }} />
                </div>
                <Button variant="outlined" onClick={savePassword} disabled={!passwordValue || !confPasswordValue || !!passwordState || !!confPasswordState} startIcon={<SaveAsOutlinedIcon />} type="submit" sx={{ marginTop: '20px', width: '50%' }}>Save</Button>
                <div className="SuccessMessage">
                {savePasswordStatus === 200 && <h3> Password was changed.</h3>}
                </div>
            </div>

            <div className="section">
                <h3 className="sectionTitle">General Information</h3>
                <div className="name">
                    <TextField
                        label="Name" margin="normal" size="small" autoComplete="off" error={nameState !== ""} helperText={nameState} onChange={onChangeName} sx={{ width: '100%' }} />
                </div>
                <div className="dateOfBirth">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            orientation="landscape"
                            label="Date of birth"
                            maxDate={new Date()}
                            openTo="year"
                            value={dateOfBirth}
                            onChange={onChangeDateOfBirth}
                            renderInput={(params) =>
                                <TextField size="small" margin="normal" {...params} sx={{ width: '100%' }}
                                />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="gender">
                    <TextField
                        className="react-dropdown"
                        label="Gender"
                        size="small"
                        margin="normal"
                        select
                        onChange={onChangeGender}
                        sx={{ width: '100%' }}
                    >
                        {Constants.GENDER_OPTIONS?.map(genderOption => {
                            return (
                                <MenuItem key={genderOption.value} value={genderOption.value}>
                                    {genderOption.label}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                </div>
                <div className="localization">
                    <TextField
                        label="Localization" margin="normal" size="small" autoComplete="off" error={nameState !== ""} helperText={localizationState} onChange={onChangeLocalization} sx={{ width: '100%' }} />
                </div>
                <Button variant="outlined" onClick={saveUserGeneralInformation}  startIcon={<SaveAsOutlinedIcon />} type="submit" sx={{ marginTop: '20px', width: '50%' }}>Save</Button>
                <div className="SuccessMessage"> 
                {savePasswordStatus === 200 && <h3> Password was changed.</h3>}
                </div>
                
            </div>

        </div>

    )

}


export default UserInformationSection;