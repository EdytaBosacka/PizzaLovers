import React, { useState } from 'react';

function LoginForm({ login }: { login: (loginData: { login: string, password: string }) => void }) {
    const [loginData, setLoginData] = useState({ login: "", password: "" });
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(loginData);
    }

    return (
        <form onSubmit={submit}>
            <div className="login">
                <label htmlFor="login"> Login </label>
                <input type="text" name="login" id="loginId" onChange={e => setLoginData({ ...loginData, login: e.target.value })} value={loginData.login} />
            </div>
            <div className="password">
                <label htmlFor="password"> Password </label>
                <input type="password" name="password" id="passwordId" onChange={e => setLoginData({ ...loginData, password: e.target.value })} value={loginData.password} />
            </div>
            <input type="submit" value="Login" />

        </form>
    )
}

export default LoginForm;