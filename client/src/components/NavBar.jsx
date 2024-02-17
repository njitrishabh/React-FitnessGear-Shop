import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <nav>
                <div className="nav-items container">
                    <div className="logo">
                        <a href="/">
                            <h1>Fitness APP</h1>
                        </a>
                    </div>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;