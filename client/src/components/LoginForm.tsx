import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Button from '../../node_modules/@mui/material/Button';
import TextField from '@mui/material/TextField';
import './LoginForm.css';

function LoginForm({ login }: { login: (loginData: { [x: string]: any }) => void }) {
    const { register, handleSubmit, formState: { errors, isValid }, watch, getValues, control, reset } = useForm({ mode: "onBlur" });

    const submit = handleSubmit(data => {
        login(data);
    });

    return (
        <div className="loginForm">
            <form onSubmit={submit}>
                <div className="login">
                    <TextField style={{ width: 250 }}
                        label="Login" margin="normal" size="small" autoComplete="off" {...register("login", { required: true })} />
                    {errors?.login?.type === "required" && <p className="errorMessage">Login is required.</p>}
                </div>
                <div className="password">
                    <TextField style={{ width: 250 }}
                        label="Password" margin="normal" type="password" size="small"  {...register("password", { required: true })} />
                    {errors?.password?.type === "required" && <p className="errorMessage">Password is required.</p>}

                </div>
                <div className="loginButton">
                    <Button variant="outlined" type="submit" sx={{ width: '20%' }}>Login</Button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;