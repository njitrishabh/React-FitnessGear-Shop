import React, { useState, useEffect } from "react";

const Home = () => {

    const [productNames, setProductNames] = useState([]);
    const [productName, setProductName] = useState([]);

    const handleFetchData = async () => {
        const response = await fetch('http://localhost:8080/product-names');
        const data = await response.json();
        setProductNames(data);
    }

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    return (

        <div className="container">
            <div className="banner-container">
                <h2>Your one stop shop for fitness shopping</h2>
                <h1>Product Search</h1>
                <label>Product name:</label>
                <select value={productName} onChange={handleProductNameChange}>
                    <option value="">Select Product</option>
                    {
                        productNames.map((obj) => {
                            return <option value={obj.name}>{obj.name}</option>
                        })
                    }
                </select>
            </div>

        </div>
    );
};

export default Home;