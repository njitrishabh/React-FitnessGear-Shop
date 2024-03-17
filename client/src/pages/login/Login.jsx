import React, { useState } from 'react';
import firebase from '../../utils/firebase';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        onLogin(email, password);
    }

    return (
        <div>
            <h2>User Login</h2>
            <label>Email:</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <br></br>
            <label>Password:</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <br></br>
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;