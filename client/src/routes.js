import { useRoutes, Route, Switch, Redirect, Link, useNavigate } from "react-router-dom";
import Home from './pages/home/Home';
import NoMatch from './components/NoMatch';
import ProductDetail from './pages/productDetail/ProductDetail';
import InsertProduct from './pages/insertProduct/InsertProduct';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import React, { useState } from 'react';
import axios from 'axios';
import Profile from "./pages/profile/Profile";

export default function Router() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email,
                password
            });

            if (response.data.success) {
                setUser(response.data.user);
                navigate('/profile');
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Login failed:', error);
        }
    }

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    }

    let element = useRoutes([
        { path: '/', element: <Home /> },
        { path: '*', element: <NoMatch /> },
        { path: '/product/*', element: <ProductDetail /> },
        { path: '/insert', element: <InsertProduct /> },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login onLogin={handleLogin} /> },
        {
            path: '/profile',
            element: user ? <Profile user={user} onLogout={handleLogout} /> : <navigate to='/login' />
        },
    ]);
    return element;
}