import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { createStore, useStateMachine, StateMachineProvider, GlobalState, } from 'little-state-machine';

function RegisterForm({ login }: { login: (loginData: { login: string, password: string }) => void }) { 
    //const [loginData, setLoginData] = useState({ login: "", password: "" });
    const { register, formState: { errors, isValid }, watch, getValues } = useForm({ mode: "onBlur" });

    const password = useRef({});
    password.current = watch("password", "");

    const updateFormDetails = (state: GlobalState, payload: { [x: string]: any; }) => {
        return {
            ...state,
            ...payload
        }
    }
    const { actions, state} = useStateMachine({ updateFormDetails });

    const [formStep, setFormStep] = useState(0);
    const nextStep = () => {
        actions.updateFormDetails(getValues());
        setFormStep(curr => curr + 1);
    }
    
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //login(loginData);
    }

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
                        <div className="password">
                            <label htmlFor="password"> Password </label>
                            <input type="password" name="password" id="passwordId"/>
                        </div>
                        <input type="submit" value="Login" />
                    </div>
                }
              <pre>{JSON.stringify(state)}</pre>
            </form>
    )
}

export default RegisterForm;
