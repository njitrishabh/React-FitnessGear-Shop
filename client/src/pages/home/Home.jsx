import React, { useState, useEffect, useCallback } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import './styles.css';
import SearchResultPage from "./SearchResultPage";

const Home = () => {

    const [productNames, setProductNames] = useState([]);
    const [selectedProductName, setSelectedProductName] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [retailers, setRetailers] = useState([]);
    const [selectedRetailer, setSelectedRetailer] = useState([]);
    const [minPrice, setMinPrice] = useState([]);
    const [maxPrice, setMaxPrice] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [showContent, setShowContent] = useState(false);

    const handleProductData = async () => {
        const response = await fetch('http://localhost:8080/product-names');
        const data = await response.json();
        setProductNames(data);
    }

    useEffect(() => {
        handleProductData();
    }, []);

    const handleProductNameChange = (selected) => {
        setSelectedProductName(selected.length > 0 ? selected[0] : '');
        setSelectedBrand('');
        setBrands([]);
        setSelectedRetailer('');
        setRetailers([]);
    };

    const handleSearch = useCallback((q) => {
        // console.log('handlesearch');
    }, []);

    const handleDependentFiltersData = async () => {
        const response = await fetch(`http://localhost:8080/search-products?productName=${selectedProductName.label}`);
        const data = await response.json();
        setBrands(data);
    }

    useEffect(() => {
        if (selectedProductName) {
            handleDependentFiltersData();
        }
    }, [selectedProductName]);


    const handleBrandFiltersData = async () => {
        const response = await fetch(`http://localhost:8080/search-products?productName=${selectedProductName.label}&brandName=${selectedBrand.value}`);
        const data = await response.json();
        setRetailers(data);
    }

    useEffect(() => {
        if (selectedProductName && selectedBrand) {
            handleBrandFiltersData();
        }
        setSelectedRetailer('');
    }, [selectedProductName, selectedBrand]);

    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:8080/search-products?productName=${selectedProductName.label}&brandName=${selectedBrand?.value || ''}&reailerName=${selectedRetailer?.value || ''}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const data = await response.json();
        setSearchResult(data);
        setShowContent(true);
    }



    return (
        <>
            <div className="search-filters">
                <div className="search-text">
                    <h1>Product Search</h1>
                    <label htmlFor="product-name-typeahead">Product name:</label>
                    <AsyncTypeahead
                        id="product-name-typeahead"
                        options={productNames}
                        onChange={handleProductNameChange}
                        placeholder="Search for a product..."
                        onSearch={handleSearch}
                        inputProps={{ "title": "Product name:" }}
                    />
                </div>
                <div className="brand-dropdpown">
                    <label>Brand:</label>
                    <Select
                        options={brands.map((brand) => ({ value: brand.brand, label: brand.brand }))}
                        value={selectedBrand}
                        onChange={(selectedOption) => setSelectedBrand(selectedOption)}
                        isClearable
                        isSearchable={false}
                    />
                </div>
                <div className="retailer-dropdpown">
                    <label>Retailer:</label>
                    <Select
                        options={retailers.map((retailer) => ({ value: retailer.retailer, label: retailer.retailer }))}
                        value={selectedRetailer}
                        onChange={(selectedOption) => setSelectedRetailer(selectedOption)}
                        isClearable
                        isSearchable={false}
                    />
                </div>
                <div className="min-price">
                    <label>Min Price: </label>
                    <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                </div>
                <div className="max-price">
                    <label>Max Price: </label>
                    <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <div className="submit-button">
                    <button onClick={handleSubmit}>Search</button>
                </div>

            </div>
            <div className="search-result">
                <SearchResultPage searchOutput={searchResult} showContent={showContent} />
            </div>
        </>
    );
};

export default Home;