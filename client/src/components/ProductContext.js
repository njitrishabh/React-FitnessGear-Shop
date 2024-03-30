import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const handleDefaultView = async () => {
        const response = await fetch('http://localhost:8080/search-products');
        const data = await response.json();
        const updateProducts = await addIsFavoriteAttribute(data);
        const cheapestProducts = await getCheapestProducts(updateProducts);
        setProducts(cheapestProducts);
        localStorage.setItem('products', JSON.stringify(cheapestProducts));
    }

    useEffect(() => {
        handleDefaultView();
    }, []);

    const addIsFavoriteAttribute = async (products) => {
        return products.map(product => ({
            ...product,
            favorite: false
        }));
    };

    const getCheapestProducts = async (products) => {
        const uniqueProductIds = [...new Set(products.map(product => product.product_id))];
        const cheapestProducts = uniqueProductIds.map(productId => {
            const filteredProducts = products.filter(product => product.product_id == productId);
            return filteredProducts.reduce((acc, curr) => acc.price < curr.price ? acc : curr);
        });
        return cheapestProducts;
    }

    return (
        <ProductContext.Provider value={{ products, setProducts, favorites, setFavorites }}>
            {children}
        </ProductContext.Provider>
    );

};