import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = ({ user, onLogout }) => {

    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
    }

    return (
        <div>
            <h2>Welcome, {user.username}</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <p>
                Back to <Link to="/">Home</Link>
            </p>
        </div>
    );
};

export default Profile;