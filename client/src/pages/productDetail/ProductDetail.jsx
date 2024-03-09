import React from "react";
import { useLocation } from "react-router-dom";
import './styles.css';

const ProductDetail = (props) => {
    const { state } = useLocation();

    return (
        <div className="flex-parent">
            <div className="left-child">
                <img className='image' src={state.image} width="500" height="500"></img>
            </div>
            <div className="right-child">
                <h3>{state.name}</h3>
                <p></p>
                <h5>$ {state.price}</h5>
                <p></p>
                <label><b>Product Details</b></label>
                <p>{state.details}</p>
                <label><b>How to use this gear</b></label>
                <p>{state.howToUse}</p>
            </div>

        </div>
    );
};

export default ProductDetail;