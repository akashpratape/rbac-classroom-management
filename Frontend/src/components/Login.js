import React, { useState } from "react";
import axios from "axios";
import "../index.css"

function Login({ setToken }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login", { email, password })
            const { token } = response.data;

            // store token in local storage
            localStorage.setItem("token", token);

            //store users role and other details
            const role = response.data.role;
            localStorage.setItem("role", role);

            //redirect user to dashboard according to role
            if (role === "Principal") {
                window.location.href = "/principal";
            } else if (role === "Teacher") {
                window.location.href = "/teacher";
            } else {
                window.location.href = "/student"
            }

        } catch (err) {
            setError("invalid credentials")
        }
    }

    return (

    <div className="login-container">
      <h1 className="login-heading">Login</h1>
        <form onSubmit={handleLogin}>
            <div className="email-container">
                <label className="email-txt">Email</label>
                <input
                    className="ip-field-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="password-container">
                <label className="pass-txt">Password</label>
                <input
                    className="pass-ip-field"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="login-btn">Login</button>
        </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

    )
}

export default Login