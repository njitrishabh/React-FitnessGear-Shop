import React from 'react';

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