import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'

const Landing = () => {

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            navigate('/search');
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <>
            <div class="main-container">
                <div class="blur-circle1">

                </div>
                <div class="blur-circle2">

                </div>
                <div class="landing-page">
                    <div class="content">
                        <div class="container">
                            <div class="info">
                                <h1>Looking For Inspiration</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihil</p>
                                <button onClick={handleClick}>Search Products</button>
                            </div>
                            <div class="image">
                                <img alt='mainImage' class="main-image" src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-using-vr-tech-3840669-3202986.png?f=webp" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;