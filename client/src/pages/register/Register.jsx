import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState('');

    const handleRegistration = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                username,
                email,
                password
            });

            if (response.data.success) {
                alert('Registration succesful');
                setRegistered('Registration successful');
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Registration failed:', error);
        }
    }

    return (
        <div>
            <h2>User Registration</h2>
            <label htmlFor="username">Full Name:</label>
            <input id='username' name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <br></br>
            <label htmlFor="email">Email:</label>
            <input id='email' name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <br></br>
            <label htmlFor="password">Password:</label>
            <input id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <br></br>
            <button onClick={handleRegistration}>Register</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
            <p>{registered}</p>
        </div>
    );
}

export default Register;