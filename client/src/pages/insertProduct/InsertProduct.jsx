import React, { useState } from "react";
import './styles.css'
import axios from 'axios';

const InsertProduct = () => {

    const [formData, setFormData] = useState({
        productName: '',
        productDetails: '',
        productHowtouse: '',
        productImage: '',
        brandName: '',
        retailerName: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/submit-form', formData);
            alert("submitted");
            console.log(response.data);
            setFormData({
                productName: '',
                productDetails: '',
                productHowtouse: '',
                productImage: '',
                brandName: '',
                retailerName: '',
                price: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    }

    return (
        <div className="flex-parent">
            <form onSubmit={handleSubmit}>
                <label>Product Name:
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange}></input>
                </label>
                <br />
                <label>Product Details:
                    <input type="text" name="productDetails" value={formData.productDetails} onChange={handleChange}></input>
                </label>
                <br />
                <label>How To Use:
                    <input type="text" name="productHowtouse" value={formData.productHowtouse} onChange={handleChange}></input>
                </label>
                <br />
                <label>Product Image:
                    <input type="text" name="productImage" value={formData.productImage} onChange={handleChange}></input>
                </label>
                <br />
                <label>
                    Brand:
                    <input type="text" name="brandName" value={formData.brandName} onChange={handleChange}></input>
                </label>
                <br />
                <label>
                    Retailer:
                    <input type="text" name="retailerName" value={formData.retailerName} onChange={handleChange}></input>
                </label>
                <br />
                <label>
                    Price:
                    <input type="text" name="price" value={formData.price} onChange={handleChange}></input>
                </label>
                <br />
                <button type="submit">Submit</button>

            </form>
        </div>
    )
};

export default InsertProduct;