import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="nav-items container">
                    <div className="logo">
                        <a href="/">
                            <h1>Fitness APP</h1>
                        </a>
                    </div>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="/">
                                <h1>Home</h1>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;