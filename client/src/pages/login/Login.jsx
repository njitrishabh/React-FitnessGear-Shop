import React, { useState } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please fill in all fields.');
                return;
            }
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>User Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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