import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useProductContext } from './ProductContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
    const { favorites, setFavorites } = useProductContext();
    const { products, setProducts } = useProductContext();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, [setFavorites]);

    const toggleFavorite = () => {
        const updatedFavorites = product.favorite
            ? favorites.filter((p) => p.product_id !== product.product_id)
            : [...favorites, { ...product, favorite: true }];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        const updatedProducts = products.map((p) => {
            if (p.product_id === product.product_id) {
                return { ...p, favorite: !product.favorite };
            }
            return p;
        });
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    return (
        <div className='tile' key={product.product_id}>
            <Link to={'/product'}
                state={product}>
                <img alt='productImage' className='image' src={product.image} width="500" height="500"></img>
            </Link>
            <div className='price'><b>${product.price}</b></div>
            <div className='productname'><b>{product.name}</b></div>
            <div className='brand'><b>Brand: {product.brand}</b></div>
            <div className='retailer'><b>Retailer: {product.retailer}</b></div>
            <div className="favorite">
                <span onClick={toggleFavorite}>
                    <FontAwesomeIcon icon={faHeart} style={{ color: product.favorite ? 'red' : 'gray' }} />
                </span>
            </div>
        </div>
    );
};

export default ProductItem;