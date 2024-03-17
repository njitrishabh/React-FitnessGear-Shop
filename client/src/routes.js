import { useRoutes, Route, Switch, Redirect, Link, useNavigate, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import NoMatch from './components/NoMatch';
import ProductDetail from './pages/productDetail/ProductDetail';
import InsertProduct from './pages/insertProduct/InsertProduct';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import React, { useState } from 'react';
import Profile from "./pages/profile/Profile";
import firebase from './utils/firebase';

export default function Router() {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);


    const handleLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            setLoggedIn(true);
            navigate('/profile');

        } catch (error) {
            console.log('Login failed:', error);
        }
    }

    let element = useRoutes([
        { path: '/', element: <Home /> },
        { path: '*', element: <NoMatch /> },
        { path: '/product/*', element: <ProductDetail /> },
        { path: '/insert', element: <InsertProduct /> },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login onLogin={handleLogin} /> },
        {
            path: '/profile', element: <Profile />
        },
    ]);
    return element;
}