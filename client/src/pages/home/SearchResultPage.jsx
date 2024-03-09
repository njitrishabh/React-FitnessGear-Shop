import React from "react";
import { Link } from 'react-router-dom';
import './styles.css';

const SearchResultPage = ({ searchOutput, showContent }) => {

    return (
        <div className='search-results-child'>
            {showContent && Object.keys(searchOutput).length === 0 ? (
                <div>
                    <h3>Item Not Found.</h3>
                    <Link to="/insert">
                        <button className="insertItem">Insert Item</button>
                    </Link>
                </div>

            ) : (
                < div className='flex-results'>
                    {
                        searchOutput.map((result) => (
                            <div className="tile">
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
    );
};

export default SearchResultPage;