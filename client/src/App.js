import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/home/Home';
import NoMatch from './components/NoMatch';
import ProductDetail from './pages/productDetail/ProductDetail';
import InsertProduct from './pages/insertProduct/InsertProduct';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import React, { useState, useEffect, useRef } from 'react';
import Profile from "./pages/profile/Profile";
import Favorites from './pages/favorites/Favorites';
import Landing from './pages/landing/Landing';
import './App.css';
import { ProductProvider } from './components/ProductContext';


const App = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const activeRef = useRef(null);

    useEffect(() => {
        if (activeRef.current) {
            const items = activeRef.current.childNodes;
            const active = activeRef.current.querySelector('.active');
            if (active) {
                active.style.left = `${items[activeIndex].offsetLeft}px`;
            }
        }
    }, [activeIndex]);

    function handleItemClick(index) {
        setActiveIndex(index);
    }

    return (
        <BrowserRouter>
            <ProductProvider>
                <div>
                    <div className='container-nav'>
                        <nav className='navbar'>
                            <ul className='nav--list' ref={activeRef}>
                                <li className='item'>
                                    <NavLink to="/" activeClassName="active" onClick={() => handleItemClick(0)}>Fitness App</NavLink>
                                </li>
                                <li className='item'>
                                    <NavLink to="/search" activeClassName="active" onClick={() => handleItemClick(1)}>Search</NavLink>
                                </li>
                                <li className='item' >
                                    <NavLink to="/register" activeClassName="active" onClick={() => handleItemClick(2)}>Register</NavLink>
                                </li>
                                <li className='item' >
                                    <NavLink to="/login" activeClassName="active" onClick={() => handleItemClick(3)}>Login</NavLink>
                                </li>
                                <li className='item' >
                                    <NavLink to="/favorites" activeClassName="active" onClick={() => handleItemClick(4)}>Favorites</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/search" element={<Home />} />
                        <Route path="*" element={<NoMatch />} />
                        <Route path="/product/*" element={<ProductDetail />} />
                        <Route path="/insert" element={<InsertProduct />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </ProductProvider>
        </BrowserRouter>
    );
};

export default App;