import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

function LoginForm({ login }: { login: (loginData: { [x:string]: any}) => void }) {
    const { register, handleSubmit, formState: { errors, isValid }, watch, getValues, control, reset } = useForm({ mode: "onBlur" });

    const submit = handleSubmit(data => {
        login(data);  
    });

    return (
        <form onSubmit={submit}>
            <div className="login">
                <label htmlFor="login"> Login </label>
                <input {...register("login", { required: true})} />
                {errors?.login?.type === "required" && <p className="errorMessage">Login is required.</p>}
            </div>
            <div className="password">
                <label htmlFor="password"> Password </label>
                <input type="password" {...register("password", { required: true })} />
                {errors?.password?.type === "required" && <p className="errorMessage">Password is required.</p>}
        
            </div>
            <input type="submit" value="Login" />

        </form>
    )
}

export default LoginForm;