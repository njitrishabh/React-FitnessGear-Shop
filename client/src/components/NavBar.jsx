import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <div>
            <nav className='navbar'>
                <div className='nav-items container'>
                    <div className='logo'>
                        <a href='/'>
                            <h1>Fitness App</h1>
                        </a>
                    </div>
                    <ul className='nav-list'>
                        <li className='nav-item'>
                            <a href='/'>
                                <h1>Home</h1>
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a href='/register'>
                                <h1>Register</h1>
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a href='/login'>
                                <h1>Login</h1>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;