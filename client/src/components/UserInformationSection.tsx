import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './UserInformationSection.css';

function UserInformationSection() {

    const [passwordState, setPasswordState] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confPasswordState, setConfPasswordState] = useState('');
    const [nameState, setNameState] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length >= 7 && event.target.value.length <= 20) {
            setPasswordState('');
            setPasswordValue(event.target.value);
        } else {
            setPasswordState('Password must have between 7 and 20 characters.');
        }
    }
    const onChangeConfPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === passwordValue) {
            setConfPasswordState('');
        } else {
            setConfPasswordState('Passwords are not identical.');
        }
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.match(/^[A-Za-z]+$/i)) {
            setNameState('');
        } else {
            setNameState('Name contains invalid charactersl.');
        }
    }
    const onChangeDateOfBirth = (newValue: Date | null) => {
        setDateOfBirth(newValue);
    };

    return (
        <div className="userInformationSection">
            <div>
                <h3 className="sectionTitle">Password</h3>
                <div className="password">
                    <TextField
                        label="Password" margin="normal" type="password" size="small" autoComplete="off" error={passwordState !== ""} helperText={passwordState} onChange={onChangePassword} sx={{ width: '100%' }} />
                </div>
                <div className="confirmedPassword">
                    <TextField
                        label="ConfirmedPassword" margin="normal" type="password" size="small" autoComplete="off" error={confPasswordState !== ""} helperText={confPasswordState} onChange={onChangeConfPassword} sx={{ width: '100%' }} />
                </div>
            </div>
            <div>
                <h3 className="sectionTitle">General Information</h3>
                <div className="name">
                    <TextField
                        label="Name" margin="normal" size="small" autoComplete="off" error={nameState !== ""} helperText={nameState} onChange={onChangeName} sx={{ width: '90%' }} />
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
                                <TextField size="small" margin="normal" {...params} sx={{ width: '90%' }}
                                />}
                        />
                    </LocalizationProvider>
                </div>

            </div>
        </div>

    )

}


export default UserInformationSection;