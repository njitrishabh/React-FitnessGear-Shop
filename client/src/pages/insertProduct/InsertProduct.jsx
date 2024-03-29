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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        validateField(name, value);
    }

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'productName':
            case 'productDetails':
            case 'productHowtoUse':
            case 'brandName':
            case 'retailerName':
                if (!value.trim()) {
                    error = 'Field is required';
                }
                break;

            case 'price':
                if (!validatePrice(value)) {
                    error = 'Please enter a valid price';
                }
                break;

            case 'productImage':
                if (!validateProductImage(value)) {
                    error = 'Please enter a valid product image url';
                }
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const validateProductImage = (value) => {
        const urlPattern = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
        return urlPattern.test(value);
    };

    const validatePrice = (value) => {
        if (!isNaN(value)) {
            if (parseFloat(value) > 0) {
                if (/^\d+(\.\d{1,2})?$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasErrors = Object.values(errors).some(error => error);
        if (hasErrors) {
            alert('Please fix all errors before submitting the form.')
            return;
        }

        for (const field in formData) {
            if (formData[field] === '') {
                alert(`Please fill in the field ${field} field.`);
                return;
            }
        }

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
        <div className="addProduct-flex-parent">
            <h2>Add Product</h2>
            <form className="addProduct-form" onSubmit={handleSubmit}>
                <label>Product Name:
                    <input type="text" name="productName" value={formData.productName} onChange={handleChange}></input>
                    {errors.productName && <span className="error" style={{ color: 'red' }}>&nbsp;{errors.productName}</span>}
                </label>
                <br />
                <label>Product Details:
                    <input type="text" name="productDetails" value={formData.productDetails} onChange={handleChange}></input>
                    {errors.productDetails && <span className="error" style={{ color: 'red' }}>&nbsp;{errors.productDetails}</span>}
                </label>
                <br />
                <label>How To Use:
                    <input type="text" name="productHowtouse" value={formData.productHowtouse} onChange={handleChange}></input>
                    {errors.productHowtouse && <span className="error" style={{ color: 'red' }}>&nbsp;{errors.productHowtouse}</span>}
                </label>
                <br />
                <label>Product Image:
                    <input type="text" name="productImage" value={formData.productImage} onChange={handleChange}></input>
                    {errors.productImage && <span className="error" style={{ color: 'red' }}>&nbsp;{errors.productImage}</span>}
                </label>
                <br />
                <label>
                    Brand:
                    <input type="text" name="brandName" value={formData.brandName} onChange={handleChange}></input>
                    {errors.brandName && <span className="error" style={{ color: 'red' }}>&nbsp;{errors.brandName}</span>}
                </label>
                <br />
                <label>
                    Retailer:
                    <input type="text" name="retailerName" value={formData.retailerName} onChange={handleChange}></input>
                    {errors.retailerName && <span className="error" style={{ color: 'red' }}>&nbsp;{errors.retailerName}</span>}
                </label>
                <br />
                <label>
                    Price:
                    <input type="text" name="price" value={formData.price} onChange={handleChange}></input>
                    {errors.price && <span className="error" style={{ color: 'red' }}>&nbsp;{errors.price}</span>}
                </label>
                <br />
                <button type="submit">Submit</button>

            </form>
        </div>
    )
};

export default InsertProduct; 