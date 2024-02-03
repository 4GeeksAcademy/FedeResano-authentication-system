import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await actions.checkLoginInfo(email, password);

        if (result.token) {
            navigate('/private')
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>New here? Sign up now:</p>
            <button className="btn btn-primary">Sign up</button>
        </div>
    );
}

export default Login;