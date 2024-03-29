import React, { useState } from 'react';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Please fill in all the fields.');
                return;
            }
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='login-wrap'>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='login-form'>
                <label>Email:</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <br></br>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <br></br>
                <button onClick={handleLogin}>Sign in</button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;