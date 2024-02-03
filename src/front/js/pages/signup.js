import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


const Signup = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [secondPasswordInput, setSecondPasswordInput] = useState("");


    const handleSignup = async (e) => {
        e.preventDefault();

        if (passwordInput !== secondPasswordInput) {
            console.error("Passwords don't match");
            return;
        }

        const result = await actions.sendSignup(emailInput, passwordInput);

        if (result === "Signup successful.") {
            navigate("/login");
        } else {
            console.error("Error signing up.")
        }

    };


    return (
        <div className="container">
            <h3>Sign-up</h3>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">E-mail address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Password (must be longer than 8 characters)</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={secondPasswordInput}
                        onChange={(e) => setSecondPasswordInput(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Signup;