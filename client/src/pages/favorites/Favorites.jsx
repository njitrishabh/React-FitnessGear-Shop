import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMyContext } from '../../components/MyContext';

const Favorites = () => {

    const { sharedState } = useMyContext();
    let favProducts = [];

    if (sharedState.length !== 0) {
        favProducts = sharedState.filter(product => product.isFavorite);
    }


    return (
        <>
            {Object.keys(favProducts).length === 0 ? (
                <div>
                    <h3>No Item Found</h3>
                </div>
            ) : (
                <div className='flex-results'>
                    {
                        favProducts.map((result) => (
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
        </>
    );
}

export default Favorites;