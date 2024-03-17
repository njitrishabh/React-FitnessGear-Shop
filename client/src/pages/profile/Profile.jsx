import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../utils/firebase';
import './styles.css';

const Profile = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [productNames, setProductNames] = useState([]);

    const handleLogout = async () => {
        firebase.auth().signOut().then(
            () => {
                navigate('/');
            }
        ).catch(error => {
            console.log("logout error", error);
        });
    }

    const handleProductData = async () => {
        const response = await fetch('http://localhost:8080/products');
        const data = await response.json();
        setProductNames(data);
        console.log(productNames);
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            handleProductData();
        });
        return () => unsubscribe();

    }, []);

    return (
        <div>
            {user ? (
                <div>
                    < button onClick={handleLogout}>Logout</button>
                    <div className='flex-results'>
                        {
                            productNames.slice(-5).map((result) => (
                                <div className='tile'>
                                    <label>New Arrivals!</label>
                                    <Link to={'/product'}
                                        state={result}>
                                        <img className='image' src={result.image} width="500" height="500"></img>
                                    </Link>
                                    <div className='productname'><b>{result.name}</b></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) :
                (
                    <p>
                        Please login! <Link to="/login">Login</Link>
                    </p>
                )
            }

        </div >
    );
};

export default Profile;