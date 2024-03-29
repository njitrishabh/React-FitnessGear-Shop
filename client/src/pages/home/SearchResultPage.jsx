import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useMyContext } from '../../components/MyContext';

const SearchResultPage = ({ searchOutput, showContent }) => {

    const { sharedState, setSharedState } = useMyContext();

    const [defaultProductNames, setDefaultProductNames] = useState([]);
    const [updatedProducts, setUpdatedProducts] = useState([]);

    const handleDefaultView = async () => {
        const response = await fetch('http://localhost:8080/search-products');
        const data = await response.json();
        setDefaultProductNames(data);
    }

    useEffect(() => {
        handleDefaultView();
    }, []);

    function getCheapestProducts(products) {
        const uniqueProductIds = [...new Set(products.map(product => product.product_id))];
        const cheapestProducts = uniqueProductIds.map(productId => {
            const filteredProducts = products.filter(product => product.product_id == productId);
            return filteredProducts.reduce((acc, curr) => acc.price < curr.price ? acc : curr);
        });
        return cheapestProducts;
    }

    const cheapestProducts = getCheapestProducts(defaultProductNames);

    useEffect(() => {

        const addIsFavoriteAttribute = (products) => {
            return products.map(product => ({
                ...product,
                isFavorite: false
            }));
        };

        if (updatedProducts.length === 0) {
            setUpdatedProducts(prevProducts => addIsFavoriteAttribute(cheapestProducts));
        }
    }, [cheapestProducts, updatedProducts]);

    const toggleFavorite = async (productId) => {
        await setUpdatedProducts(prevProducts =>
            prevProducts.map(product =>
                product.product_id === productId ? { ...product, isFavorite: !product.isFavorite } : product
            )
        );
    }

    console.log(updatedProducts, "updated");
    setSharedState(updatedProducts);

    return (
        <>

            <div className='search-results-child'>
                {showContent && Object.keys(searchOutput).length === 0 ? (
                    <div>
                        <h3>Item Not Found</h3>
                        <Link to="/insert">
                            <button className='insertItem'>Insert Item</button>
                        </Link>
                    </div>
                ) : (
                    <div className='flex-results'>
                        {
                            searchOutput.map((result) => (
                                <div className='tile'>
                                    <Link to={'/product'}
                                        state={result}>
                                        <img className='image' src={result.image} width="500" height="500"></img>
                                    </Link>
                                    <div className='price'><b>${result.price}</b></div>
                                    <div className='productname'><b>{result.name}</b></div>
                                    <div className='brand'><b>Brand: {result.brand}</b></div>
                                    <div className='retailer'><b>Retailer: {result.retailer}</b></div>
                                </div>
                            ))
                        }
                    </div>
                )}

            </div >
            <div>
                {!showContent ? (
                    <div className='flex-results'>
                        {
                            updatedProducts.map((result) => (
                                <div className='tile' key={result.product_id}>
                                    <Link to={'/product'}
                                        state={result}>
                                        <img className='image' src={result.image} width="500" height="500"></img>
                                    </Link>
                                    <div className='price'><b>${result.price}</b></div>
                                    <div className='productname'><b>{result.name}</b></div>
                                    <div className='brand'><b>Brand: {result.brand}</b></div>
                                    <div className='retailer'><b>Retailer: {result.retailer}</b></div>
                                    <div className="favorite">
                                        <span onClick={() => toggleFavorite(result.product_id)}>
                                            <FontAwesomeIcon icon={result.isFavorite ? faHeart : farHeart} />
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (<></>)}
            </div>


        </>
    );
};

export default SearchResultPage;