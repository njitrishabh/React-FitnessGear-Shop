import React, { useState } from 'react';
import { useProductContext } from '../../components/ProductContext';
import ProductItem from '../../components/ProductItem';

const Favorites = () => {

    const { favorites } = useProductContext();
    console.log(favorites, "favorite page");

    return (
        <>
            {Object.keys(favorites).length === 0 ? (
                <div>
                    <h3>No Item Found</h3>
                </div>
            ) : (
                <div className='flex-results'>
                    {
                        favorites.map((product) => (
                            <ProductItem key={ProductItem.product_id} product={product} />
                        ))
                    }
                </div>
            )}
        </>
    );
}

export default Favorites;