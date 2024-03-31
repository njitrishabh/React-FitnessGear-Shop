import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../../utils/firebase';
import './styles.css';

const Profile = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [productNames, setProductNames] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);

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
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            handleProductData();

            const checkSubscription = async () => {
                const email = user.email;
                const db = firebase.firestore();

                try {
                    const doc = await db.collection('subscriptions').doc(email).get();
                    if (doc.exists) {
                        setSubscribed(doc.data().subscribed);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error:', error);
                    setLoading(false);
                }
            };
            if (user) {
                checkSubscription();
            }

        });
        return () => unsubscribe();

    }, []);

    const handleSubscription = async () => {
        const email = user.email;
        const db = firebase.firestore();

        try {
            await db.collection('subscriptions').doc(email).set({ subscribed: true });
            setSubscribed(true);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleOptOut = async () => {
        const email = user.email;
        const db = firebase.firestore();

        try {
            await db.collection('subscriptions').doc(email).delete();
            setSubscribed(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (user && loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {user ? (
                <div>
                    < button onClick={handleLogout}>Logout</button>
                    <div>
                        {
                            !subscribed ? (
                                <button onClick={handleSubscription}>Subscribe</button>
                            ) : (
                                <button onClick={handleOptOut}>Unsubscribe</button>
                            )
                        }
                    </div>
                    <div className='flex-results'>
                        {
                            productNames.slice(-5).map((result) => (
                                <div className='tile'>
                                    <label>New Arrivals!</label>
                                    <Link to={'/product'}
                                        state={result}>
                                        <img alt='productImage' className='image' src={result.image} width="500" height="500"></img>
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