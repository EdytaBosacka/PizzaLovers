import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { createStore, useStateMachine, StateMachineProvider, GlobalState, } from 'little-state-machine';
//import { DatePicker } from "antd";
import Select from 'react-select';
import moment from 'moment';

import CheckIcon from '@mui/icons-material/Check';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Button from '../../node_modules/@mui/material/Button';
import { StepIconProps } from '@mui/material/StepIcon';
import './RegisterForm.css';

function RegisterForm({ registerForm, registerState }: { registerForm: (registerData: { [x: string]: any; }) => void, registerState: number }) {

    const { register, handleSubmit, formState: { errors, isValid }, watch, getValues, control, reset } = useForm({ mode: "onBlur" });
    const password = useRef({});
    password.current = watch("password", "");

    const updateFormDetails = (state: GlobalState, payload: { [x: string]: any; }) => {
        return {
            ...state,
            ...payload
        }
    }
    const { actions, state } = useStateMachine({ updateFormDetails });
    const [activeStep, setActiveStep] = useState(0);

    const backStep = () => {
        setActiveStep(curr => curr - 1);
    }

    const steps = ['Account Setup', 'User Details', 'Complete'];

    const dateFormat = 'YYYY/MM/DD';
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'no-binary', label: 'No-binary' },
    ];

    useEffect(() => {
        if (registerState === 200) {
            setActiveStep(2);
        } else if (activeStep === 2 && registerState === 0) {
            setActiveStep(0);
            reset();
        }
    });
    const submit = handleSubmit(data => {
        actions.updateFormDetails(getValues());
        if (activeStep === 0) {
            setActiveStep(1);
        }
        else {
            registerForm(data);
        }
    });

    // CSS style for Stepper

    const StepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 30,
        height: 30,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(252, 126, 66) 0%, rgb(252, 193, 66) 20%, rgb(252, 126, 66) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(252, 126, 66) 0%, rgb(252, 193, 66) 20%, rgb(252, 126, 66) 100%)',
        }),
    }));

    function StepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        const icons: { [index: string]: React.ReactElement } = {
            1: <LockOutlinedIcon />,
            2: <PersonOutlineOutlinedIcon />,
            3: <CheckIcon />,
        };

        return (
            <StepIconRoot ownerState={{ completed, active }} className={className}>
                {completed ? (
                    <CheckIcon />
                ) : (
                    icons[String(props.icon)]
                )}

            </StepIconRoot>
        );
    }



    return (
        <div className="registerForm">
            <Box sx={{ marginLeft: '30px', marginRight: '30px', marginTop: '10px', marginBottom: '20px' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        return (
                            <Step key={label} {...stepProps}
                                sx={{
                                    '& .MuiStepLabel-root .Mui-completed': {
                                        color: 'secondary.main',
                                    },
                                    '& .MuiStepLabel-root .Mui-active': {
                                        color: 'secondary.main',

                                    },
                                }
                                }
                            >
                                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                            </Step>

                        );
                    })}

                </Stepper>
            </Box>

            <form onSubmit={submit}>
                {activeStep === 0 &&
                    <div>
                        <div className="login">
                            <TextField
                                label="Login" margin="normal" size="small" autoComplete="off" {...register("login", {
                                    required: true, maxLength: 20,
                                    pattern: /^[A-Za-z0-9]+$/i
                                })} sx={{ width: '40%' }}/>
                            {errors?.login?.type === "required" && <p className="errorMessage">Login is required.</p>}
                            {errors?.login?.type === "maxLength" && <p className="errorMessage">Login cannot exceed 20 characters.</p>}
                            {errors?.login?.type === "pattern" && <p className="errorMessage">Login contains invalid characters.</p>}
                        </div>

                        <div className="password">
                            <TextField
                                label="Password" margin="normal" type="password" size="small" autoComplete="off" {...register("password", {
                                    required: true, maxLength: 20,
                                    minLength: 7
                                })} sx={{ width: '40%' }} />
                            {errors?.password?.type === "required" && <p className="errorMessage">Password is required.</p>}
                            {errors?.password?.type === "maxLength" && <p className="errorMessage">Password cannot exceed 20 characters.</p>}
                            {errors?.password?.type === "minLength" && <p className="errorMessage">Password must have at least 7 characters.</p>}
                        </div>

                        <div className="confirmedPassword">
                            <TextField
                                label="Confirm password" margin="normal" type="password" size="small" autoComplete="off" {...register("confirmedPassword", {
                                    required: true,
                                    validate: value => value === password.current
                                })} sx={{ width: '40%' }} />
                            {errors?.confirmedPassword?.type === "validate" && <p className="errorMessage">The passwords do not match</p>}
                        </div>
                        <div className="registerButton">
                            <Button variant="outlined" type="submit">Next</Button>
                        </div>
                    </div>
                }
                {activeStep === 1 &&
                    <div>
                        <div className="name">
                            <TextField
                                label="Name" margin="normal" size="small" autoComplete="off" {...register("name",
                                    { required: true, pattern: /^[A-Za-z]+$/i })} sx={{ width: '40%' }} />
                            {errors?.name?.type === "required" && <p className="errorMessage">Name is required.</p>}
                            {errors?.name?.type === "pattern" && <p className="errorMessage">Name contains invalid characters.</p>}
                        </div>
                        <div className="dateOfBirth">
                            <Controller
                                control={control}
                                name="dateOfBirth"
                                render={({ field: { onChange } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            orientation="landscape"
                                            label="Date of birth"
                                            value={getValues("dateOfBirth") ? getValues("dateOfBirth") : null}
                                            maxDate={new Date()}
                                            openTo="year"
                                            onChange={(newValue) => {
                                                onChange(moment(newValue).format(dateFormat));
                                            }}
                                            renderInput={(params) =>
                                                <TextField size="small" margin="normal" {...params} sx={{ width: '40%' }}
                                                />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </div>
                        <div className="gender">
                            <label htmlFor="gender"> Gender </label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <Select
                                        components={{ IndicatorSeparator: () => null }}
                                        onChange={(genderOptions) => { onChange(genderOptions) }}
                                        className="react-dropdown"
                                        classNamePrefix="react-select"
                                        isSearchable={false}
                                        options={genderOptions}
                                        defaultValue={getValues("gender")}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                            {errors?.gender?.type === "required" && <p className="errorMessage">Gender is required.</p>}
                        </div>
                        <div className="localization">
                            <TextField
                                label="Localization" margin="normal" size="small" autoComplete="off" {...register("localization",
                                    { required: true, pattern: /^[A-Za-z]+$/i })} sx={{ width: '40%' }} />
                            {errors?.localization?.type === "required" && <p className="errorMessage">Localization is required.</p>}
                            {errors?.localization?.type === "pattern" && <p className="errorMessage">Localization contains invalid characters.</p>}
                        </div>

                        <Button variant="outlined" onClick={backStep}> Back </Button>
                        <Button variant="outlined" type="submit"> Create account </Button>
                    </div>
                }
                {activeStep == 2 &&
                    <div className="SuccessMessage">
                        <h3> User was successfully created. </h3>
                    </div>
                   

                }
                <pre>{JSON.stringify(state)}</pre>
            </form>
        </div>
    )
}

export default RegisterForm;
