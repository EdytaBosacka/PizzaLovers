import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { createStore, useStateMachine, StateMachineProvider, GlobalState, } from 'little-state-machine';
import { DatePicker } from "antd";
import Select from 'react-select';

function RegisterForm({ registerForm, registerState }: { registerForm: (registerData: { [x:string]:any; }) => void, registerState: number}){
    //const [loginData, setLoginData] = useState({ login: "", password: "" });
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
    const [formStep, setFormStep] = useState(0);

    // functions called by button's onClick
    const nextStep = () => {
        actions.updateFormDetails(getValues());
        setFormStep(curr => curr + 1);
    }
    const backStep = () => {
        setFormStep(curr => curr - 1);
    }

    const dateFormat = 'YYYY/MM/DD';
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'no-binary', label: 'No-binary' },
    ];
    
    useEffect(() => {
        if (registerState === 200){
            setFormStep(2);
        } else if(formStep ===2 && registerState === 0 ) {
            setFormStep(0);
            reset();
        }
    });
    const submit = handleSubmit(data => registerForm(data));

    return (
        <form onSubmit={submit}>
            {formStep === 0 &&
                <div>
                    <div className="login">
                        <label htmlFor="login"> Login </label>
                        <input
                            {...register("login", { required: true, maxLength: 20, pattern: /^[A-Za-z0-9]+$/i })}
                        />
                        {errors?.login?.type === "required" && <p className="errorMessage">Login is required.</p>}
                        {errors?.login?.type === "maxLength" && <p className="errorMessage">Login cannot exceed 20 characters.</p>}
                        {errors?.login?.type === "pattern" && <p className="errorMessage">Login contains invalid characters.</p>}

                    </div>

                    <div className="password">
                        <label htmlFor="password"> Password </label>
                        <input type="password"
                            {...register("password", { required: true, maxLength: 20, minLength: 7 })}
                        />
                        {errors?.password?.type === "required" && <p className="errorMessage">Password is required.</p>}
                        {errors?.password?.type === "maxLength" && <p className="errorMessage">Password cannot exceed 20 characters.</p>}
                        {errors?.password?.type === "minLength" && <p className="errorMessage">Password must have at least 7 characters.</p>}
                    </div>

                    <div className="confirmedPassword">
                        <label htmlFor="confirmedPassword"> Confirm password </label>
                        <input type="password"
                            {...register("confirmedPassword", { required: true, validate: value => value === password.current })}
                        />
                        {errors?.confirmedPassword?.type === "validate" && <p className="errorMessage">The passwords do not match</p>}
                    </div>
                    <button disabled={!isValid} onClick={nextStep} type="button"> Next </button>

                </div>
            }
            {formStep === 1 &&
                <div>
                    <div className="name">
                        <label htmlFor="name"> Name </label>
                        <input
                            {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
                        />
                        {errors?.name?.type === "required" && <p className="errorMessage">Name is required.</p>}
                        {errors?.name?.type === "pattern" && <p className="errorMessage">Name contains invalid characters.</p>}
                    </div>
                    <div className="dateOfBirth">
                        <label htmlFor="dateOfBirth"> Date of birth </label>
                        <Controller
                            control={control}
                            name="dateOfBirth"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker format={dateFormat}
                                    onChange={(date, dateString) => { onChange(dateString) }} // send value to hook form
                                    onBlur={onBlur}
                                />
                            )}

                        />
                    </div>
                    <div className="gender">
                        <label htmlFor="gender"> Gender </label>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field: {onChange}}) => (
                                <Select
                                    components = {{IndicatorSeparator:() => null}}
                                    onChange={(genderOptions) => { onChange(genderOptions?.value) }}
                                    className="react-dropdown"
                                    isSearchable={false}
                                    options={genderOptions}
                                />
                            )}
                        />
                    </div>
                    <div className="localization">
                        <label htmlFor="localization"> Localization </label>
                        <input
                            {...register("localization", { required: true, pattern: /^[A-Za-z]+$/i })}
                        />
                        {errors?.localization?.type === "required" && <p className="errorMessage">Name is required.</p>}
                        {errors?.localization?.type === "pattern" && <p className="errorMessage">Name contains invalid characters.</p>}
                    </div>

                    <button onClick={backStep} type="button"> Back </button>
                    <input type="submit" value="Create account" />
                </div>
            }
            { formStep == 2  && 
                <div>
                    <p> Udalo sie</p>
                    
                </div>
                
            }
            <pre>{JSON.stringify(state)}</pre>
        </form>
    )
}

export default RegisterForm;
