import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '../../node_modules/@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
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
    const oldNameValue = useRef('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());
    const oldDateOfBirth = useRef('');
    const [gender, setGender] = useState('');
    const oldGender = useRef('');
    const [localizationState, setLocalizationState] = useState('');
    const [localizationValue, setLocalizationValue] = useState('');
    const oldLocalizationValue = useRef('');
    const [saveGeneralInfoStatus, setSaveGeneralInfoStatus] = useState(0);

    const [phoneNumber, setPhoneNumber] = useState('');
    const oldPhoneNumber = useRef('');
    const [emailState, setEmailState] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const oldEmailValue = useRef('');
    const [instagramState, setInstagramState] = useState('');
    const [instagramValue, setInstagramValue] = useState('');
    const oldInstagramValue = useRef('');
    const [twitterState, setTwitterState] = useState('');
    const [twitterValue, setTwitterValue] = useState('');
    const oldTwitterValue = useRef('');
    const [saveContactInfoStatus, setSaveContactInfoStatus] = useState(0);

    const [isInitialized, setIsInitialized] = useState(false);

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
        }).catch(function (error) { });
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
        API.saveUserGeneralInformation({ name: nameValue, dateOfBirth: moment(dateOfBirth).format(Constants.DATE_FORMAT), gender: gender, localization: localizationValue })
            .then((response) => {
                setSaveGeneralInfoStatus(response.status);
                oldNameValue.current = nameValue;
                oldDateOfBirth.current = moment(dateOfBirth).format(Constants.DATE_FORMAT);
                oldGender.current = gender;
                oldLocalizationValue.current = localizationValue;
            }).catch(function (error) { });
    }


    const onChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => { 
        if (event.target.value.match(/^[0-9]*$/i)) {
            setPhoneNumber(event.target.value);
        } 
    }
    const onChangeEmail= (event: React.ChangeEvent<HTMLInputElement>) => { 
        setEmailValue(event.target.value);
        if (event.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
            setEmailState('');
        } else {
            setEmailState('Email format is invalid.');
        }
    }
    const onChangeInstagram= (event: React.ChangeEvent<HTMLInputElement>) => { 
        setInstagramValue(event.target.value);
        if (event.target.value.match(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/i)) {
            setInstagramState('');
        } else {
            setInstagramState('Instagram username is invalid.');
        }
    }
    const onChangeTwitter= (event: React.ChangeEvent<HTMLInputElement>) => { 
        setTwitterValue(event.target.value);
        if (event.target.value.match(/^@?(\w){1,15}$/i)) {
            setTwitterState('');
        } else {
            setTwitterState('Twitter username is invalid.');
        }
    }
    const saveUserContactInformation = () => {
        API.saveUserContactInformation({ phoneNumber: phoneNumber, email: emailValue, instagram: instagramValue, twitter: twitterValue })
        .then((response) => {
            setSaveContactInfoStatus(response.status);
            oldPhoneNumber.current = phoneNumber;
            oldEmailValue.current = emailValue;
            oldInstagramValue.current = instagramValue;
            oldTwitterValue.current = twitterValue;
        }).catch(function (error) { });
    }
    

    const getUserDetails = () => {
        API.getUserDetails().then((response) => {
            if (response.data) {
                oldNameValue.current = response.data.name;
                oldDateOfBirth.current = response.data.dateOfBirth;
                oldGender.current = response.data.gender;
                oldLocalizationValue.current = response.data.localization;
                oldPhoneNumber.current = response.data.phoneNumber;
                oldEmailValue.current = response.data.email;
                oldInstagramValue.current = response.data.instagram;
                oldTwitterValue.current = response.data.twitter;

                setNameValue(response.data.name);
                setDateOfBirth(response.data.dateOfBirth);
                setGender(response.data.gender);
                setLocalizationValue(response.data.localization);
                setPhoneNumber(response.data.phoneNumber);
                setEmailValue(response.data.email);
                setInstagramValue(response.data.instagram);
                setTwitterValue(response.data.twitter);

                setIsInitialized(true);
            }
        }).catch(function (error) { });

    }

    const isSaveContactInfoDisabled = () : boolean => {
        return !isInitialized || !!emailState || !!instagramState || !!twitterState || ( oldPhoneNumber.current === phoneNumber && oldEmailValue.current === emailValue
        && oldInstagramValue.current === instagramValue && oldTwitterValue.current === twitterValue );
    }

    const isSaveGenInfoDisabled = () : boolean => {
        return !isInitialized || !!nameState || !!localizationState || ( oldNameValue.current === nameValue && oldDateOfBirth.current === moment(dateOfBirth).format(Constants.DATE_FORMAT)
        && oldGender.current === gender && oldLocalizationValue.current === localizationValue );
    }

    const isSavePasswordDisabled = () : boolean => {
        return !passwordValue || !confPasswordValue || !!passwordState || !!confPasswordState;
    }

    useEffect(() => {
        getUserDetails();
    }, [])

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
                <Button variant="outlined" onClick={savePassword} disabled={isSavePasswordDisabled()} startIcon={<SaveAsOutlinedIcon />} type="submit" sx={{ marginTop: '20px', width: '50%' }}>Save</Button>
                <div className="SuccessMessage">
                    {savePasswordStatus === 200 && <h3> Password was changed.</h3>}
                </div>
            </div>

            <div className="section">
                <h3 className="sectionTitle">General Information</h3>
                <div className="name">
                    <TextField
                        label="Name" value={nameValue} margin="normal" size="small" autoComplete="off" error={nameState !== ""} helperText={nameState} onChange={onChangeName} sx={{ width: '100%' }} />
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
                        value={gender}
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
                        label="Localization" value={localizationValue} margin="normal" size="small" autoComplete="off" error={localizationState !== ""} helperText={localizationState} onChange={onChangeLocalization} sx={{ width: '100%' }} />
                </div>
                <Button variant="outlined" onClick={saveUserGeneralInformation} disabled={isSaveGenInfoDisabled()} startIcon={<SaveAsOutlinedIcon />} type="submit" sx={{ marginTop: '20px', width: '50%' }}>Save</Button>
                <div className="SuccessMessage">
                    {saveGeneralInfoStatus === 200 && <h3> User information was changed.</h3>}
                </div>
            </div>

            <div className="section">
                <h3 className="sectionTitle">Contact Information</h3>
                <div className="phoneNumber">
                    <TextField
                        label="Phone Number" value={phoneNumber} margin="normal" size="small" autoComplete="off" onChange={onChangePhoneNumber} sx={{ width: '100%' }} />
                </div>
                <div className="email">
                    <TextField
                        label="Email" margin="normal" size="small" autoComplete="off" error={emailState !== ""} helperText={emailState} onChange={onChangeEmail} sx={{ width: '100%' }} />
                </div>
                <div className="instagram">
                    <TextField
                        label="Instagram"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <InstagramIcon/>
                              </InputAdornment>
                            )
                        }} 
                        margin="normal" size="small" autoComplete="off" error={instagramState !== ""} helperText={instagramState} onChange={onChangeInstagram} sx={{ width: '100%' }} />
                </div>
                <div className="twitter">
                    <TextField
                        label="Twitter"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <TwitterIcon/>
                              </InputAdornment>
                            )
                        }} 
                        margin="normal" size="small" autoComplete="off" error={twitterState !== ""} helperText={twitterState} onChange={onChangeTwitter} sx={{ width: '100%' }} />
                </div>
                <Button variant="outlined" onClick={saveUserContactInformation} disabled={isSaveContactInfoDisabled()} startIcon={<SaveAsOutlinedIcon />} type="submit" sx={{ marginTop: '20px', width: '50%' }}>Save</Button>
                <div className="SuccessMessage">
                    {saveContactInfoStatus === 200 && <h3> User contact info was saved.</h3>}
                </div>
            </div>

        </div>

    )

}


export default UserInformationSection;