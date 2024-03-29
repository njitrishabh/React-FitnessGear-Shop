import React, { useState } from 'react';
import firebase from '../../utils/firebase';
import { Link } from 'react-router-dom';
import './styles.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegistration = async () => {
        try {
            if (!username || !email || !password) {
                setError('Please fill in all fields');
                return
            }
            if (password.length < 6) {
                setError('Passsword must be at least 6 characters long.')
            }

            await firebase.auth().createUserWithEmailAndPassword(email, password);

            await firebase.auth().currentUser.updateProfile({
                displayName: username
            });

            alert("Registration successful");
            setEmail('');
            setUsername('');
            setPassword('');
            setError('');

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='register-wrap'>
            <h2>User Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='register-form'>
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
            </div>
        </div>
    );
}

export default Register;